import "../css/currencytable.css";
import codelogo from "./assets/flags";
import cbe from "../assets/logo/CBE.png";
import awash from "../assets/logo/awsah.webp";
import dashen from "../assets/logo/dashen.png";
import nib from "../assets/logo/nib.webp";
import abyssinia from "../assets/logo/abyssinia.webp";
import abay from "../assets/logo/abay.webp";
import hibret from "../assets/logo/hibret.svg";

const logos = {
  cbe,
  awash,
  dashen,
  nib,
  abyssinia,
  abay,
  hibret,
};


function CurrencyTable({ data, selected, selectedCurrency }) {

  const filteredData = data.filter((item) => {
    const bankMatch = selected
      ? item.bank_name === selected
      : true;

    const currencyMatch = selectedCurrency
      ? item.currency_code === selectedCurrency
      : true;

    return bankMatch && currencyMatch;
  });

  return (
    <div className="table-con">
      <h1><i class="fa-solid fa-money-bill-transfer"></i> Exchange Rates</h1>

      <table>
      

        <thead>
          <tr>
            <th>Bank Name</th>
            <th>Currency</th>
            <th>Buy</th>
            <th>Sell</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr key={index}>
                <td className="bank-cell">
                  <img
                    src={logos[item.bank_name.toLowerCase()] || cbe}
                    alt={item.bank_name}
                    className="table-logo"
                  />
                  {item.bank_name}
                </td>

          <td className="code-cell">
  <img
    src={
      codelogo?.[item.currency_code?.toLowerCase()]
        ? `https://flagcdn.com/w40/${codelogo[item.currency_code.toLowerCase()]}.png`
        : "https://flagcdn.com/w40/un.png"
    }
    alt="flag"
  />    <span>{item.currency_code}</span>
</td>
                <td className="buy">{item.buy}</td>
                <td className="sell">{item.sell}</td>
                <td className="date">
                 {new Date(item.created_at).toLocaleString("en-US", {
                     month: "short",
                     day: "numeric",
                     hour: "numeric",
                     minute: "2-digit", })}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CurrencyTable;