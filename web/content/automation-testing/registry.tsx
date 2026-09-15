import type { ReactNode } from "react";
import { SectionCaiPython } from "./section-cai-python";
import { SectionCaiVscodeMoTerminal } from "./section-cai-vscode-mo-terminal";
import { SectionMoiTruongAoVenv } from "./section-moi-truong-ao-venv";
import { SectionVietScriptDauTien } from "./section-viet-script-dau-tien";
import { SectionHamFunction } from "./section-ham-function";
import { SectionListVongLapFor } from "./section-list-vong-lap-for";
import { SectionDictTuDien } from "./section-dict-tu-dien";
import { SectionJsonCauNoiPythonApi } from "./section-json-cau-noi-python-api";
import { SectionTaoDuAnCaiDat } from "./section-tao-du-an-cai-dat";
import { SectionViSaoDungPytest } from "./section-vi-sao-dung-pytest";
import { SectionVietTestDauTien } from "./section-viet-test-dau-tien";
import { SectionChayTest } from "./section-chay-test";
import { SectionKienTrucBrowserContextPage } from "./section-kien-truc-browser-context-page";
import { SectionTuMoTrinhDuyetBangCode } from "./section-tu-mo-trinh-duyet-bang-code";
import { SectionChupAnhManHinh } from "./section-chup-anh-man-hinh";
import { SectionLocatorLaGi } from "./section-locator-la-gi";
import { SectionViSaoItFlaky } from "./section-vi-sao-it-flaky";
import { SectionVietBaiTestUiDauTien } from "./section-viet-bai-test-ui-dau-tien";
import { SectionAssertThuongVsExpect } from "./section-assert-thuong-vs-expect";
import { SectionThemBaiTestThu2 } from "./section-them-bai-test-thu-2";
import { SectionVaiAssertionHayDungKhac } from "./section-vai-assertion-hay-dung-khac";
import { SectionApirequestcontextLaGi } from "./section-apirequestcontext-la-gi";
import { SectionTaoApirequestcontextBangFixture } from "./section-tao-apirequestcontext-bang-fixture";
import { SectionGoiGetDonGian } from "./section-goi-get-don-gian";
import { SectionDocDuLieuTuResponse } from "./section-doc-du-lieu-tu-response";
import { SectionExpectResponseChiCo2Viec } from "./section-expect-response-chi-co-2-viec";
import { SectionKiemTraStatusCodeCuThe } from "./section-kiem-tra-status-code-cu-the";
import { SectionDocLoiTestKhiFailed } from "./section-doc-loi-test-khi-failed";
import { SectionSetupTeardownVoiYield } from "./section-setup-teardown-voi-yield";
import { SectionScopeTaoMoiHayDungLai } from "./section-scope-tao-moi-hay-dung-lai";
import { SectionFixtureDungFixtureKhac } from "./section-fixture-dung-fixture-khac";
import { SectionDocLoiKhiGoSaiTenFixture } from "./section-doc-loi-khi-go-sai-ten-fixture";
import { SectionDocTaiLieuApiChinhThuc } from "./section-doc-tai-lieu-api-chinh-thuc";
import { SectionGoiThuBangCurl } from "./section-goi-thu-bang-curl";
import { SectionBangTestCaseHoanChinh } from "./section-bang-test-case-hoan-chinh";
import { SectionFixtureAuthToken } from "./section-fixture-auth-token";
import { SectionAuth01DangNhapDung } from "./section-auth-01-dang-nhap-dung";
import { SectionAuth02Den05SaiThieu } from "./section-auth-02-den-05-sai-thieu";
import { SectionXacNhanFixtureDungLaiDuoc } from "./section-xac-nhan-fixture-dung-lai-duoc";
import { SectionGetDanhSachVaTimTheoId } from "./section-get-danh-sach-va-tim-theo-id";
import { SectionPostTaoBooking } from "./section-post-tao-booking";
import { SectionPutPatchSuaBooking } from "./section-put-patch-sua-booking";
import { SectionDeleteXoaBooking } from "./section-delete-xoa-booking";
import { SectionNhanRaChoLapCode } from "./section-nhan-ra-cho-lap-code";
import { SectionTachApiClient } from "./section-tach-api-client";
import { SectionFixtureClient } from "./section-fixture-client";
import { SectionRefactorTestPutPatchDelete } from "./section-refactor-test-put-patch-delete";
import { SectionGopAuthBangParametrize } from "./section-gop-auth-bang-parametrize";
import { SectionViSaoCanKetHopUiApi } from "./section-vi-sao-can-ket-hop-ui-api";
import { SectionDungApiLamNguonSuThat } from "./section-dung-api-lam-nguon-su-that";
import { SectionFixtureRestfulBookerPlatform } from "./section-fixture-restful-booker-platform";
import { SectionVietTestDoiChieu } from "./section-viet-test-doi-chieu";
import { SectionPhatHienDuLieuDemoDungChung } from "./section-phat-hien-du-lieu-demo-dung-chung";
import { SectionXuatBaoCaoHtml } from "./section-xuat-bao-cao-html";
import { SectionNangCapAllureReport } from "./section-nang-cap-allure-report";
import { SectionChayTuDongGithubActionsCi } from "./section-chay-tu-dong-github-actions-ci";

export const sectionContent: Record<string, () => ReactNode> = {
  "cai-python-venv-script-dau-tien/cai-python": SectionCaiPython,
  "cai-python-venv-script-dau-tien/cai-vscode-mo-terminal": SectionCaiVscodeMoTerminal,
  "cai-python-venv-script-dau-tien/moi-truong-ao-venv": SectionMoiTruongAoVenv,
  "cai-python-venv-script-dau-tien/viet-script-dau-tien": SectionVietScriptDauTien,
  "ham-list-dict-json/ham-function": SectionHamFunction,
  "ham-list-dict-json/list-vong-lap-for": SectionListVongLapFor,
  "ham-list-dict-json/dict-tu-dien": SectionDictTuDien,
  "ham-list-dict-json/json-cau-noi-python-api": SectionJsonCauNoiPythonApi,
  "cai-playwright-pytest-dau-tien/tao-du-an-cai-dat": SectionTaoDuAnCaiDat,
  "cai-playwright-pytest-dau-tien/vi-sao-dung-pytest": SectionViSaoDungPytest,
  "cai-playwright-pytest-dau-tien/viet-test-dau-tien": SectionVietTestDauTien,
  "cai-playwright-pytest-dau-tien/chay-test": SectionChayTest,
  "kien-truc-browser-context-page/kien-truc-browser-context-page": SectionKienTrucBrowserContextPage,
  "kien-truc-browser-context-page/tu-mo-trinh-duyet-bang-code": SectionTuMoTrinhDuyetBangCode,
  "kien-truc-browser-context-page/chup-anh-man-hinh": SectionChupAnhManHinh,
  "locator-fill-click/locator-la-gi": SectionLocatorLaGi,
  "locator-fill-click/vi-sao-it-flaky": SectionViSaoItFlaky,
  "locator-fill-click/viet-bai-test-ui-dau-tien": SectionVietBaiTestUiDauTien,
  "assertion-expect/assert-thuong-vs-expect": SectionAssertThuongVsExpect,
  "assertion-expect/them-bai-test-thu-2": SectionThemBaiTestThu2,
  "assertion-expect/vai-assertion-hay-dung-khac": SectionVaiAssertionHayDungKhac,
  "apirequestcontext/apirequestcontext-la-gi": SectionApirequestcontextLaGi,
  "apirequestcontext/tao-apirequestcontext-bang-fixture": SectionTaoApirequestcontextBangFixture,
  "apirequestcontext/goi-get-don-gian": SectionGoiGetDonGian,
  "apirequestcontext/doc-du-lieu-tu-response": SectionDocDuLieuTuResponse,
  "assertion-response/expect-response-chi-co-2-viec": SectionExpectResponseChiCo2Viec,
  "assertion-response/kiem-tra-status-code-cu-the": SectionKiemTraStatusCodeCuThe,
  "assertion-response/doc-loi-test-khi-failed": SectionDocLoiTestKhiFailed,
  "fixture/setup-teardown-voi-yield": SectionSetupTeardownVoiYield,
  "fixture/scope-tao-moi-hay-dung-lai": SectionScopeTaoMoiHayDungLai,
  "fixture/fixture-dung-fixture-khac": SectionFixtureDungFixtureKhac,
  "fixture/doc-loi-khi-go-sai-ten-fixture": SectionDocLoiKhiGoSaiTenFixture,
  "lap-test-case/doc-tai-lieu-api-chinh-thuc": SectionDocTaiLieuApiChinhThuc,
  "lap-test-case/goi-thu-bang-curl": SectionGoiThuBangCurl,
  "lap-test-case/bang-test-case-hoan-chinh": SectionBangTestCaseHoanChinh,
  "test-auth/fixture-auth-token": SectionFixtureAuthToken,
  "test-auth/auth-01-dang-nhap-dung": SectionAuth01DangNhapDung,
  "test-auth/auth-02-den-05-sai-thieu": SectionAuth02Den05SaiThieu,
  "test-auth/xac-nhan-fixture-dung-lai-duoc": SectionXacNhanFixtureDungLaiDuoc,
  "crud-booking/get-danh-sach-va-tim-theo-id": SectionGetDanhSachVaTimTheoId,
  "crud-booking/post-tao-booking": SectionPostTaoBooking,
  "crud-booking/put-patch-sua-booking": SectionPutPatchSuaBooking,
  "crud-booking/delete-xoa-booking": SectionDeleteXoaBooking,
  "chuan-hoa-framework/nhan-ra-cho-lap-code": SectionNhanRaChoLapCode,
  "chuan-hoa-framework/tach-api-client": SectionTachApiClient,
  "chuan-hoa-framework/fixture-client": SectionFixtureClient,
  "chuan-hoa-framework/refactor-test-put-patch-delete": SectionRefactorTestPutPatchDelete,
  "chuan-hoa-framework/gop-auth-bang-parametrize": SectionGopAuthBangParametrize,
  "gioi-thieu-ket-hop-ui-api/vi-sao-can-ket-hop-ui-api": SectionViSaoCanKetHopUiApi,
  "gioi-thieu-ket-hop-ui-api/dung-api-lam-nguon-su-that": SectionDungApiLamNguonSuThat,
  "viet-test-ket-hop-ui-api/fixture-restful-booker-platform": SectionFixtureRestfulBookerPlatform,
  "viet-test-ket-hop-ui-api/viet-test-doi-chieu": SectionVietTestDoiChieu,
  "viet-test-ket-hop-ui-api/phat-hien-du-lieu-demo-dung-chung": SectionPhatHienDuLieuDemoDungChung,
  "report-ci/xuat-bao-cao-html": SectionXuatBaoCaoHtml,
  "report-ci/nang-cap-allure-report": SectionNangCapAllureReport,
  "report-ci/chay-tu-dong-github-actions-ci": SectionChayTuDongGithubActionsCi,
};
