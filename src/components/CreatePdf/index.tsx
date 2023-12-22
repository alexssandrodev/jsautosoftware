import Launch from "../../models/Launch";

interface CreatePdfProps {
    launch: Launch[]
}

function CreatePdf(props: CreatePdfProps) {

    return (
        <section>
            <div>
                <div id="content-id">
                    <div id="content-id">
                        <ul>
                            {props.launch.map((item) => (
                                <li key={item.id}>
                                    <h2>Cliente: {item.name}</h2>
                                    <span>Data do lançamento: {item.date}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CreatePdf;
