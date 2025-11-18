// Snippet rafce.
const Footer = () => {
  // Use JavaScript Date class
  const date = new Date();
  // use String.fromCharCode(169) to output the copytright symbol.
  // use date.getFullYear() to oupt the current year.
  // This will update the year for us each year.
  return (
    <footer className="bg-success mt-3">
      <p className="py-3 text-end text-white me-4">
        copyright { String.fromCharCode(169)}
        { ' ' + date.getFullYear()} Websites &apos;R&apos; Us
      </p>

    </footer>
  )
}

export default Footer;