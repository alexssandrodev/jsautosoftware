import Launch from '@/models/Launch';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';

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
                                    <p>Valor da mão de obra: {item.valueHandConstructions}</p>
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
