import React, { useCallback, useMemo, useState } from "react";
import { Menu, Layout } from "antd";
import { ItemType } from "antd/lib/menu/hooks/useItems";

export const Header: React.FC = () => {
  const onSelect = useCallback((selectInfo: any) => {
    location.href = selectInfo.item.props.url;

  }, []);
  const menuItems = useMemo(
    () =>
      [
        { label: "Explore", url: "/explore/repos" },
        {
          label: "Resources",
          children: [
            { label: "Docs", url: "/docs/index.html" },
            { label: "FAQ", url: "/docs/faq/index.html" },
            { label: "Blog", url: "/blog/" },
          ],
        },
        {
          label: "Company",
          children: [
            { label: "Our story", url: "/about" },
            { label: "Carrers", url: "/careers" },
          ],
        },
        { label: "Pricing", url: "/pricing" },
      ],
    []
  );
  return (
    <div className="dh-header">
      <img
        width="176"
        height="50"
        alt="DAGsHub navbar logo"
        className="ui image"
        src="/img/favicon-detail.svg"
      ></img>
      <Menu
        selectedKeys={[]}
        onSelect={onSelect}
        items={menuItems as any}
        mode="horizontal"
        theme="dark"
      ></Menu>
    </div>
  );
};
