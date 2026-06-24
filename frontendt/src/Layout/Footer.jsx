import "./css/footer.css";

function Footer() {

  return (
    <footer className="footer">

      <div className="footer-container">


        {/* Brand */}
        <div className="footer-brand">

          <h2>
            <i className="fa-solid fa-money-bill-transfer"></i>
            Ethio Exchange
          </h2>

          <p>
            Real-time currency exchange rates
            from Ethiopian banks.
          </p>

        </div>



        {/* Links */}
        <div className="footer-links">

          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/api">Rates</a>
          <a href="/banks">Banks</a>
          <a href="/about">About</a>

        </div>



        {/* Contact */}
        <div className="footer-contact">

          <h3>Contact</h3>

          <p>
            <i className="fa-solid fa-envelope"></i>
            support@ethioexchange.com
          </p>


          <p>
            <i className="fa-solid fa-location-dot"></i>
            Ethiopia
          </p>


        </div>



        {/* Social */}
        <div className="footer-social">

          <h3>Follow</h3>


          <div className="social-icons">

            <a href="#">
              <i className="fa-brands fa-telegram"></i>
            </a>


            <a href="#">
              <i className="fa-brands fa-facebook"></i>
            </a>


            <a href="#">
              <i className="fa-brands fa-twitter"></i>
            </a>

          </div>


        </div>


      </div>



      <div className="footer-bottom">

        © {new Date().getFullYear()} Ethio Exchange.
        All rights reserved.

      </div>


    </footer>
  );
}


export default Footer;