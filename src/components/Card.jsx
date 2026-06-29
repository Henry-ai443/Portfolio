/**
 * Card Component
 * Reusable card primitive with hover effects and theming support
 *
 * Props:
 * - icon: React component or JSX element
 * - title: Card title
 * - description: Card description/content
 * - interactive: Boolean to enable hover-lift effect (default: true)
 * - children: Alternative to description if you need more complex content
 */

import "../styles/Card.css";

export const Card = ({
  icon,
  title,
  description,
  interactive = true,
  children,
  className = "",
}) => (
  <article className={`card ${interactive ? "interactive" : ""} ${className}`}>
    {icon && <div className="card-icon">{icon}</div>}
    {title && <h3 className="card-title">{title}</h3>}
    <div className="card-body">
      {children ? children : <p className="card-description">{description}</p>}
    </div>
  </article>
);

export default Card;
