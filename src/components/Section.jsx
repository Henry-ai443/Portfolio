/**
 * Section Component
 * Reusable layout primitive that standardizes padding, max-width, and typography
 * across all major content sections.
 *
 * Usage:
 * <Section>
 *   <Section.Label>My services</Section.Label>
 *   <Section.Title>What I Do</Section.Title>
 *   <Section.Subtitle>Description here</Section.Subtitle>
 *   <Section.Content>
 *     {/* Your content goes here */}
 *   </Section.Content>
 * </Section>
 */

export const Section = ({ children, className = "", id = "" }) => (
  <section id={id} className={`section-wrapper ${className}`}>
    {children}
  </section>
);

export const SectionLabel = ({ children }) => (
  <span className="section-label">{children}</span>
);

export const SectionTitle = ({ children, highlight = null }) => (
  <h2 className="section-title">
    {highlight ? (
      <>
        {children.split(highlight).map((part, i) => (
          <span key={i}>
            {part}
            {i < children.split(highlight).length - 1 && (
              <span className="highlight">{highlight}</span>
            )}
          </span>
        ))}
      </>
    ) : (
      children
    )}
  </h2>
);

export const SectionSubtitle = ({ children }) => (
  <p className="section-subtitle">{children}</p>
);

export const SectionContent = ({ children, maxWidth = "var(--content-max)" }) => (
  <div
    className="section-content"
    style={{ maxWidth, marginLeft: "auto", marginRight: "auto" }}
  >
    {children}
  </div>
);

export default Section;
