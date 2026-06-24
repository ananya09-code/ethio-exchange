import { endpoints } from "../lib/endpoint";
import "./css/apicard.css";

function Apicard({ type }) {

    const id = Number(type);

    // base is already in endpoints (id: 0)
    const end = endpoints.find(e => e.id === id) || endpoints[0];

    return (
        <div className="endpoint">

            <div className="endpoint-text">
                <h2>
                    <span>{end.method}</span> {end.endpoint}
                </h2>

                <h6>{end.title}</h6>

                <p>{end.description}</p>
            </div>

            <div className="endpoint-right">

                <div className="end-example">
                    <p>Example</p>

                    <div className="endpoint-box">
                        <pre>
                            <code>{`${end.method} ${end.example}`}</code>
                        </pre>
                    </div>
                </div>

                <div className="end-response">
                    <p>Response</p>

                    <div className="endpoint-box">
                        <pre>
                            <code>
{JSON.stringify(end.response, null, 2)}
                            </code>
                        </pre>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Apicard;