import { MenuIcon } from "ui-components";
import { Menu } from "@headlessui/react";
import classNames from "classnames";
import { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { NavigationProps } from "./types";
import { NavigationLink } from "@local-components/navbar/navigation-link";

interface DisclosureContentProps {
  items: NavigationProps["items"];
  close: () => void;
}

function MenuContent({ items, close }: DisclosureContentProps) {
  const location = useLocation();
  const [t] = useTranslation();

  useEffect(() => {
    close();
  }, [close, location]);

  return (
    <>
      <Menu.Button
        className={classNames(
          "h-full",
          "outline-none",
          "flex",
          "items-center",
          "-mr-4",
          "px-2",
        )}
      >
        <MenuIcon
          className={classNames(
            "theme-light:fill-black",
            "theme-dark:fill-white",
            "w-8",
            "h-8",
            "ui-focus-visible:outline",
            "ui-focus-visible:outline-offset-2",
            "ui-focus-visible:theme-light:outline-black",
            "ui-focus-visible:theme-dark:outline-white",
          )}
        />
        <span className="sr-only">{t("nav.menu")}</span>
      </Menu.Button>
      <Menu.Items>
        <nav
          className={classNames(
            "absolute",
            "left-0",
            "right-0",
            "[&_li]:border-b",
            "[&_li]:border-b-neutral-600",
            "theme-light:bg-neutral-300",
            "theme-dark:bg-neutral-800",
          )}
        >
          {items.map((link, index) => (
            <Menu.Item key={link.to} as={Fragment}>
              {({ active }) => (
                <div className={active ? "bg-blue-500" : "bg-red-500"}>
                  <NavigationLink to={link.to}>{link.label}</NavigationLink>
                </div>
              )}
            </Menu.Item>
          ))}
        </nav>
      </Menu.Items>
    </>
  );
}

export function MobileNavigation({ items }: NavigationProps) {
  return (
    <div
      className={classNames(
        "ml-auto",
        "md:hidden",
        "h-full",
        "flex",
        "flex-col",
        "justify-center",
      )}
    >
      <Menu>
        {({ open, close }) => <MenuContent close={close} items={items} />}
      </Menu>
    </div>
  );
}
