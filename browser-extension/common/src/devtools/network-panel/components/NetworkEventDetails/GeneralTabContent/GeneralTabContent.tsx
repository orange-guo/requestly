import React, { useCallback } from "react";
import { Button } from "antd";
import Icon, { EditOutlined } from "@ant-design/icons";
import RedirectRuleIcon from "../../../../../../resources/icons/rule-icons/redirect.svg";
import ReplaceRuleIcon from "../../../../../../resources/icons/rule-icons/replace.svg";
import CancelRuleIcon from "../../../../../../resources/icons/rule-icons/cancel.svg";
import DelayRuleIcon from "../../../../../../resources/icons/rule-icons/delay.svg";
import { NetworkEvent, RuleEditorUrlFragment } from "../../../types";
import { SourceKey, SourceOperator } from "../../../../../types";
import PropertyRow from "../../PropertyRow/PropertyRow";
import "./generalTabContent.scss";
import { createRule, getBaseUrl, getHostFromUrl } from "../../../utils";

interface Props {
  networkEvent: NetworkEvent;
}

const GeneralTabContent: React.FC<Props> = ({ networkEvent }) => {
  const redirectRequest = useCallback(() => {
    createRule(
      RuleEditorUrlFragment.REDIRECT,
      (rule) => {
        rule.pairs[0].source = {
          key: SourceKey.URL,
          operator: SourceOperator.EQUALS,
          value: networkEvent.request.url,
        };
      },
      'input[data-selectionid="destination-url"]'
    );
  }, [networkEvent]);

  const replaceHostInUrl = useCallback(() => {
    createRule(
      RuleEditorUrlFragment.REPLACE,
      (rule) => {
        rule.pairs[0].source = {
          key: SourceKey.URL,
          operator: SourceOperator.CONTAINS,
          value: getBaseUrl(networkEvent.request.url),
        };
        // @ts-ignore
        rule.pairs[0].from = getHostFromUrl(networkEvent.request.url);
      },
      'input[data-selectionid="replace-to-in-url"]'
    );
  }, [networkEvent]);

  const replacePartOfUrl = useCallback(() => {
    createRule(
      RuleEditorUrlFragment.REPLACE,
      (rule) => {
        rule.pairs[0].source = {
          key: SourceKey.URL,
          operator: SourceOperator.CONTAINS,
          value: getBaseUrl(networkEvent.request.url),
        };
      },
      'input[data-selectionid="replace-from-in-url"]'
    );
  }, [networkEvent]);

  const cancelRequest = useCallback(() => {
    createRule(
      RuleEditorUrlFragment.CANCEL,
      (rule) => {
        rule.pairs[0].source = {
          key: SourceKey.URL,
          operator: SourceOperator.EQUALS,
          value: networkEvent.request.url,
        };
      },
      'input[data-selectionid="source-value"]'
    );
  }, [networkEvent]);

  const delayRequest = useCallback(() => {
    createRule(
      RuleEditorUrlFragment.DELAY,
      (rule) => {
        rule.pairs[0].source = {
          key: SourceKey.URL,
          operator: SourceOperator.EQUALS,
          value: networkEvent.request.url,
        };
      },
      'input[data-selectionid="delay-value"]'
    );
  }, [networkEvent]);

  return (
    <div className="general-tab-content">
      <PropertyRow name="Request URL" value={networkEvent.request.url} />
      <div className="request-url-actions">
        <Button
          icon={<Icon component={RedirectRuleIcon} />}
          onClick={redirectRequest}
        >
          Redirect to a different URL
        </Button>
        <Button
          icon={<Icon component={ReplaceRuleIcon} />}
          onClick={replaceHostInUrl}
        >
          Replace host
        </Button>
        <Button icon={<EditOutlined />} onClick={replacePartOfUrl}>
          Replace part of URL
        </Button>
        <Button
          icon={<Icon component={DelayRuleIcon} />}
          onClick={delayRequest}
        >
          Delay request
        </Button>
        <Button
          icon={<Icon component={CancelRuleIcon} />}
          onClick={cancelRequest}
        >
          Cancel request
        </Button>
      </div>
    </div>
  );
};

export default GeneralTabContent;
