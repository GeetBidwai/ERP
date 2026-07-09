import { NavLink } from "react-router-dom";

import LogoutButton from "./LogoutButton";
import "./GrainLayout.css";

const grainNavItems = [
  { label: "Dashboard", path: "/grain/dashboard" },
  { label: "Inventory", path: "/grain/inventory" },
  { label: "Sales", path: "/grain/sales" },
  { label: "Customers", path: "/grain/customers" },
  { label: "Suppliers", path: "/grain/suppliers" },
  { label: "Finance", path: "/grain/finance" },
  { label: "Reports", path: "/grain/reports" },
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

      <main className="grain-layout__main">{children}</main>
    </div>
  );
}
