"""Kiem tra code trich trong Sach 5 co con khop voi code THAT khong.

Van de co that: sach nhung doan code duoc chep tay tu cac repo. Moi lan sua
code that ma quen sua sach thi doc gia lam theo sach se ra ket qua khac -
trong 1 phien lam viec da xay ra 4 lan.

Cach kiem: lay moi dong `def ...` va `class ...` xuat hien trong cac khoi
```python cua sach, roi doi chieu voi toan bo ma nguon that. Bat duoc kieu
lech nguy hiem nhat: DOI CHU KY HAM (doi name, them/bot tham so).

Chay:  python book5/scripts/kiem_tra_dong_bo.py
Tra ve ma thoat 1 neu phat hien lech -> dung duoc trong CI.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

GOC = Path(__file__).resolve().parents[2]  # D:/MAI/MAI-AI-TOOL
THU_MUC_SACH = GOC.parent / "MAI-AI-TOOL" / "book5" / "drafts"

# Ma nguon that ma sach trich dan - nay nam trong 1 repo chung da day len
# GitHub (github.com/MaiNTH6/MAI_PYTHON_POM), moi thu muc con la 1 du an
# Python doc lap. Truoc day la 4 repo rieng o D:/MAI/<ten-repo>: neu tro vao
# duong dan cu, script se doi chieu voi ban da loi thoi ma van bao "khop".
REPO_CHUNG = GOC.parent / "MAI_PYTHON_POM"

THU_MUC_MA_NGUON = [
    REPO_CHUNG / "qa-automation-core",
    REPO_CHUNG / "project-restful-booker",
    REPO_CHUNG / "project-restful-booker-platform",
    REPO_CHUNG / "project-3-he-thong",
]

KHOI_PYTHON = re.compile(r"```python\n(.*?)```", re.DOTALL)
DINH_NGHIA = re.compile(r"^\s*(def|class)\s+(\w+)")

# Nhung dinh nghia chi ton tai trong sach lam vi du minh hoa (khong co trong
# ma nguon that) - khai bao o day de khong bao dong gia.
BO_QUA = {
    "chao_hoi",           # vi du Python co ban
    "test_khong_dung_fixture",
    "TrangGia",
    "TrangChupHong",
    "ManHinhDangNhap",    # vi du trong docstring
    "TenTrangPage",       # name gia trong huong dan
    "cai_dat_toi_thieu",
}


def _cac_dinh_nghia_trong_sach() -> dict[str, list[tuple[str, int, str]]]:
    """Tra ve {ten_ham: [(file_sach, so_dong, nguyen_dong)]}"""
    ket_qua: dict[str, list[tuple[str, int, str]]] = {}
    for file_sach in sorted(THU_MUC_SACH.glob("*.md")):
        message = file_sach.read_text(encoding="utf-8")
        for khoi in KHOI_PYTHON.finditer(message):
            than_khoi = khoi.group(1)
            # Bo qua khoi danh dau ❌ - day la vi du CO Y SAI de day "dung
            # viet the nay", khong phai ma nguon that.
            if "❌" in than_khoi:
                continue
            dong_bat_dau = message[: khoi.start()].count("\n") + 1
            for i, dong in enumerate(than_khoi.splitlines()):
                khop = DINH_NGHIA.match(dong)
                if not khop:
                    continue
                name = khop.group(2)
                if name in BO_QUA:
                    continue
                ket_qua.setdefault(name, []).append(
                    (file_sach.name, dong_bat_dau + i, dong.strip())
                )
    return ket_qua


# Thu muc chua BAN SAO cua ma nguon, khong phai ma nguon. Phai bo qua, neu
# khong script se doi chieu voi ban cu roi bao "khop" oan.
# Day la loi that da xay ra: `build/lib/` con giu ban truoc khi doi ten ham,
# script tim thay ten cu o do nen bao dong bo trong khi ma nguon da doi.
THU_MUC_KHONG_PHAI_MA_NGUON = (
    ".venv",
    "__pycache__",
    ".git",
    "build",
    "dist",
    "site-packages",
    ".eggs",
)


def _ma_nguon_that() -> str:
    """Gop toan bo file .py cua cac repo thanh 1 chuoi de tra cuu.

    Thieu thu muc nao thi DUNG NGAY chu khong bo qua: mot script kiem tra ma
    khong tim thay gi de kiem, roi van bao "OK", thi te hon la khong co script.
    """
    thieu = [str(d) for d in THU_MUC_MA_NGUON if not d.is_dir()]
    if thieu:
        print("[!] KHONG THAY thu muc ma nguon:")
        for d in thieu:
            print(f"  {d}")
        print(
            "\n=> Sua duong dan trong THU_MUC_MA_NGUON. Khong doi chieu duoc thi\n"
            "   khong the ket luan sach dung - dung o day thay vi bao OK."
        )
        sys.exit(2)

    phan = []
    for directory in THU_MUC_MA_NGUON:
        for file_py in directory.rglob("*.py"):
            if any(bo in file_py.parts for bo in THU_MUC_KHONG_PHAI_MA_NGUON):
                continue
            phan.append(file_py.read_text(encoding="utf-8"))
    return "\n".join(phan)


def _chuan_hoa(dong: str) -> str:
    """Bo khoang trang thua de so sanh khong bi lech vi thut dong."""
    return re.sub(r"\s+", " ", dong).strip()


def main() -> int:
    print("Kiem tra dong bo giua Sach 5 va ma nguon that...\n")
    trong_sach = _cac_dinh_nghia_trong_sach()
    ma_nguon = _ma_nguon_that()
    ma_nguon_chuan = "\n".join(_chuan_hoa(d) for d in ma_nguon.splitlines())
    ten_co_that = set(re.findall(r"^\s*(?:def|class)\s+(\w+)", ma_nguon, re.MULTILINE))

    lech_chu_ky: list[str] = []
    khong_ton_tai: list[str] = []

    for name, cac_lan in sorted(trong_sach.items()):
        for file_sach, so_dong, dong in cac_lan:
            if name not in ten_co_that:
                khong_ton_tai.append(f"  {file_sach}:{so_dong}  {dong}")
            elif dong.rstrip().endswith(","):
                # Chu ky xuong dong nhieu hang - chi kiem tra name ton tai,
                # khong so ca dong (khong thi bao dong gia vi khac cho ngat dong).
                continue
            elif _chuan_hoa(dong) not in ma_nguon_chuan:
                lech_chu_ky.append(f"  {file_sach}:{so_dong}  {dong}")

    print(f"Da quet {len(trong_sach)} dinh nghia trong sach.\n")

    # Quet duoc 0 dinh nghia nghia la script khong doc duoc sach (sai duong
    # dan, doi name file...). Bao "OK" luc do la bao dat ma khong kiem gi.
    if not trong_sach:
        print("[!] Khong quet duoc dinh nghia nao trong sach - kiem lai THU_MUC_SACH.")
        return 2
    if not ma_nguon.strip():
        print("[!] Khong doc duoc dong ma nguon nao - kiem lai THU_MUC_MA_NGUON.")
        return 2

    if khong_ton_tai:
        print(f"[!] KHONG TIM THAY trong ma nguon ({len(khong_ton_tai)}):")
        print("\n".join(khong_ton_tai))
        print()

    if lech_chu_ky:
        print(f"[!] CHU KY KHAC voi ma nguon ({len(lech_chu_ky)}):")
        print("\n".join(lech_chu_ky))
        print()

    if not khong_ton_tai and not lech_chu_ky:
        print("OK - sach va ma nguon khop nhau.")
        return 0

    print("=> Sua sach cho khop ma nguon (hoac them vao BO_QUA neu la vi du minh hoa).")
    return 1


if __name__ == "__main__":
    sys.exit(main())
