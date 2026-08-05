import type { ReactNode } from "react";
import { SectionApiVaRestLaGi } from "./section-api-va-rest-la-gi";
import { SectionCauTrucRequestResponse } from "./section-cau-truc-request-response";
import { SectionStatusCodePhanNhom } from "./section-status-code-phan-nhom";
import { SectionHeaderThuongGap } from "./section-header-thuong-gap";
import { SectionNguNghiaHttpMethod } from "./section-nghia-http-method";
import { SectionTestApiGet } from "./section-test-get";
import { SectionTestApiPost } from "./section-test-post";
import { SectionTestApiPutPatch } from "./section-test-put-patch";
import { SectionTestApiDelete } from "./section-test-delete";
import { SectionTestLuongNghiepVuDaBuoc } from "./section-test-luong-nghiep-vu-da-buoc";
import { SectionTestTichHopGiuaCacService } from "./section-test-tich-hop-giua-cac-service";
import { SectionTestDongBoDuLieuDbQueue } from "./section-test-dong-bo-du-lieu-db-queue";
import { SectionTestTheoMoiTruong } from "./section-test-theo-moi-truong";
import { SectionBola } from "./section-bola";
import { SectionBrokenAuthentication } from "./section-broken-authentication";
import { SectionBopla } from "./section-bopla";
import { SectionUnrestrictedResourceConsumption } from "./section-unrestricted-resource-consumption";
import { SectionSecurityMisconfiguration } from "./section-security-misconfiguration";
import { SectionUnrestrictedAccessSensitiveBusinessFlows } from "./section-unrestricted-access-sensitive-business-flows";
import { SectionImproperInventoryManagement } from "./section-improper-inventory-management";
import { SectionSsrf } from "./section-ssrf";
import { SectionBfla } from "./section-bfla";
import { SectionUnsafeConsumptionOfApis } from "./section-unsafe-consumption-of-apis";
import { SectionResponseTimeThroughput } from "./section-response-time-throughput";
import { SectionLoadTestVsStressTest } from "./section-load-test-vs-stress-test";
import { SectionRaceConditionLostUpdate } from "./section-race-condition-lost-update";
import { SectionIdempotencyKey } from "./section-idempotency-key";
import { SectionContractTestingLaGi } from "./section-contract-testing-la-gi";
import { SectionValidateTheoOpenapiSwagger } from "./section-validate-theo-openapi-swagger";
import { SectionConsumerDrivenContract } from "./section-consumer-driven-contract";
import { SectionTang1UnitContractTruocCommit } from "./section-tang-1-unit-contract-truoc-commit";
import { SectionTang2IntegrationSecurityPerformanceCi } from "./section-tang-2-integration-security-performance-ci";
import { SectionTang3GiamSatProduction } from "./section-tang-3-giam-sat-production";
import { SectionKetNoiDbDeVerify } from "./section-ket-noi-db-de-verify";

export const sectionContent: Record<string, () => ReactNode> = {
  "nen-tang-api-http/api-va-rest-la-gi": SectionApiVaRestLaGi,
  "nen-tang-api-http/cau-truc-request-response": SectionCauTrucRequestResponse,
  "nen-tang-api-http/status-code-phan-nhom": SectionStatusCodePhanNhom,
  "nen-tang-api-http/header-thuong-gap": SectionHeaderThuongGap,
  "test-theo-http-method/ngu-nghia-http-method": SectionNguNghiaHttpMethod,
  "test-theo-http-method/test-api-get": SectionTestApiGet,
  "test-theo-http-method/test-api-post": SectionTestApiPost,
  "test-theo-http-method/test-api-put-patch": SectionTestApiPutPatch,
  "test-theo-http-method/test-api-delete": SectionTestApiDelete,
  "integration-testing/test-luong-nghiep-vu-da-buoc": SectionTestLuongNghiepVuDaBuoc,
  "integration-testing/test-tich-hop-giua-cac-service": SectionTestTichHopGiuaCacService,
  "integration-testing/test-dong-bo-du-lieu-db-queue": SectionTestDongBoDuLieuDbQueue,
  "integration-testing/test-theo-moi-truong": SectionTestTheoMoiTruong,
  "bao-mat-api-owasp/broken-object-level-authorization": SectionBola,
  "bao-mat-api-owasp/broken-authentication": SectionBrokenAuthentication,
  "bao-mat-api-owasp/broken-object-property-level-authorization": SectionBopla,
  "bao-mat-api-owasp/unrestricted-resource-consumption": SectionUnrestrictedResourceConsumption,
  "bao-mat-api-owasp/security-misconfiguration": SectionSecurityMisconfiguration,
  "bao-mat-api-owasp/unrestricted-access-sensitive-business-flows": SectionUnrestrictedAccessSensitiveBusinessFlows,
  "bao-mat-api-owasp/improper-inventory-management": SectionImproperInventoryManagement,
  "bao-mat-api-owasp/server-side-request-forgery": SectionSsrf,
  "bao-mat-api-owasp/broken-function-level-authorization": SectionBfla,
  "bao-mat-api-owasp/unsafe-consumption-of-apis": SectionUnsafeConsumptionOfApis,
  "performance-testing/response-time-throughput": SectionResponseTimeThroughput,
  "performance-testing/load-test-vs-stress-test": SectionLoadTestVsStressTest,
  "performance-testing/race-condition-lost-update": SectionRaceConditionLostUpdate,
  "performance-testing/idempotency-key": SectionIdempotencyKey,
  "contract-testing/contract-testing-la-gi": SectionContractTestingLaGi,
  "contract-testing/validate-theo-openapi-swagger": SectionValidateTheoOpenapiSwagger,
  "contract-testing/consumer-driven-contract": SectionConsumerDrivenContract,
  "automation-tich-hop-ci/tang-1-unit-contract-truoc-commit": SectionTang1UnitContractTruocCommit,
  "automation-tich-hop-ci/tang-2-integration-security-performance-ci": SectionTang2IntegrationSecurityPerformanceCi,
  "automation-tich-hop-ci/tang-3-giam-sat-production": SectionTang3GiamSatProduction,
  "automation-tich-hop-ci/ket-noi-db-de-verify": SectionKetNoiDbDeVerify,
};
