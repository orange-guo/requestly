import { RuleType } from "@requestly/shared/types/entities/rules";

export const PREMIUM_RULE_TYPES = [RuleType.RESPONSE, RuleType.REQUEST, RuleType.SCRIPT];

export const RULE_IMPORT_TYPE = {
  OVERWRITE: "overwrite",
  DUPLICATE: "duplicate",
};
