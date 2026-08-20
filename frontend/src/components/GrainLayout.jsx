import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import "./GrainLayout.css";

const grainNavItems = [
  { label: "Dashboard", path: "/grain/dashboard", icon: "home" },
  { label: "Inventory", path: "/grain/inventory", icon: "box" },
  { label: "Sales", path: "/grain/sales", icon: "receipt" },
  { label: "Suppliers", path: "/grain/suppliers", icon: "truck" },
  { label: "Reports", path: "/grain/reports", icon: "chart" },
  { label: "Customers", path: "/grain/customers", icon: "users" },
  { label: "Finance", path: "/grain/finance", icon: "wallet" },
];

export default function GrainLayout({ children }) {
  return (
    <div className="grain-layout">
      <aside className="grain-layout__sidebar">
        <h2 className="grain-layout__title">Family ERP</h2>
        <nav className="grain-layout__nav" aria-label="Grain module">
          {grainNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "grain-layout__link grain-layout__link--active"
                  : "grain-layout__link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="grain-layout__logout">
          <LogoutButton />
        </div>
      </aside>

      <header className="grain-layout__mobile-header">
        <span className="grain-layout__title">Family ERP</span>
        <LogoutButton />
      </header>

      <main className="grain-layout__main">{children}</main>

      <nav className="grain-layout__tabbar" aria-label="Grain module">
        {grainNavItems.slice(0, 5).map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "grain-layout__tab grain-layout__tab--active"
                : "grain-layout__tab"
            }
          >
            <span className="grain-layout__tab-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}