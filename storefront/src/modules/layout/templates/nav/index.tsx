import { useMobileMenu } from "@lib/context/mobile-menu-context";
import Hamburger from "@modules/common/components/hamburger";
import CartDropdown from "@modules/layout/components/cart-dropdown";
import DropdownMenu from "@modules/layout/components/dropdown-menu";
import MobileMenu from "@modules/mobile-menu/templates";
import DesktopSearchModal from "@modules/search/templates/desktop-search-modal";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Nav = () => {
  const { pathname } = useRouter();
  const [isHome, setIsHome] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  //useEffect that detects if window is scrolled > 5px on the Y axis
  useEffect(() => {
    if (isHome) {
      const detectScrollY = () => {
        if (window.scrollY > 5) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };

      window.addEventListener("scroll", detectScrollY);

      return () => {
        window.removeEventListener("scroll", detectScrollY);
      };
    }
  }, [isHome]);

  useEffect(() => {
    pathname === "/" ? setIsHome(true) : setIsHome(false);
  }, [pathname]);

  const { toggle } = useMobileMenu();

  // * ask permission
  const [notifPermission, setNotifPermission] = useState("");

  useEffect(() => {
    setNotifPermission(Notification.permission);
  }, []);

  const handleClick = () => {
    if (typeof window !== "undefined") {
      if (!Notification) {
        console.error("This browser doesn't support Notifications");
        return;
      }

      switch (Notification.permission) {
        case "granted":
          break;
        case "denied":
          console.info("Notifications denied by user");
          break;
        case "default":
        default:
          Notification.requestPermission().then((permission) =>
            setNotifPermission(permission)
          );
      }
    }
  };

  return (
    <div
      className={clsx("sticky top-0 inset-x-0 z-50 group", {
        "!fixed": isHome,
      })}
    >
      {/* Ask Permission */}
      {notifPermission === "default" && (
        // * Announcement bar: Request Notifications
        <div className="w-full h-fit bg-cyan-500 text-white text-center p-3">
          <p className="mb-2">
            🚀 Stay on-the-loop! Enable notifications for new arrivals,
            exclusive deals, and order tracking. 🚀
          </p>
          <button
            className="bg-yellow-500 px-3 py-1 rounded-md"
            onClick={handleClick}
          >
            Allow Notifications
          </button>
        </div>
      )}

      <header
        className={clsx(
          "relative h-16 px-8 mx-auto transition-colors bg-transparent border-b border-transparent duration-200 group-hover:bg-white group-hover:border-gray-200",
          {
            "!bg-white !border-gray-200": !isHome || isScrolled,
          }
        )}
      >
        <nav
          className={clsx(
            "text-gray-900 flex items-center justify-between w-full h-full text-small-regular transition-colors duration-200",
            {
              "text-white group-hover:text-gray-900": isHome && !isScrolled,
            }
          )}
        >
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="block small:hidden">
              <Hamburger setOpen={toggle} />
            </div>
            <div className="hidden small:block h-full">
              <DropdownMenu />
            </div>
          </div>

          <div className="flex items-center h-full">
            <Link href="/">
              <a className="text-xl-semi uppercase">Acme</a>
            </Link>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              {process.env.FEATURE_SEARCH_ENABLED && <DesktopSearchModal />}
              <Link href="/account">
                <a>Account</a>
              </Link>
            </div>
            <CartDropdown />
          </div>
        </nav>
        <MobileMenu />
      </header>
    </div>
  );
};

export default Nav;
