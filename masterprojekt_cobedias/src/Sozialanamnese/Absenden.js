import React, {Component} from "react";
import {Document, Page, PDFDownloadLink, StyleSheet, Text} from "@react-pdf/renderer";
import localStorage from "local-storage";

class Absenden extends Component {
    render() {
        return (
            <div>
                <p>Im richtigen System würde hier die Daten gesendet werden.</p>
                <p>Bei Uns bitte das PDF herunterladen und wenn möglich ausgedruckt mitbringen.</p>

                <div hidden={false}>
                    <PDFDownloadLink document={<CobediasDocument/>} fileName="Cobedias.pdf">
                        {({loading}) => (loading ? 'Loading document...' : 'Download now!')}
                    </PDFDownloadLink>
                </div>
            </div>
        );
    }
}

export default Absenden;

const PDFstyles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});


//Document which will be downloaded when clicking the blue Link. Here all Local storage variables need to be listed.
//TODO: improve design of downloaded PDF (e.g. insert line breaks, set title...)
const CobediasDocument = () => (
    <Document>
        <Page size="A4" style={PDFstyles.page}>
            <Text>Gelernter Beruf: {localStorage.get('gelernterBeruf')}</Text>
            <Text>Aktueller Beruf: {localStorage.get('aktuellerBeruf')}</Text>
            <Text>Hobbies: {localStorage.get('hobbies')}</Text>
            <Text>Militaerdienst wurde gemacht: {localStorage.get('MilitaerdienstGemacht')}</Text>
            <Text>Grund für Untauglichkeit: {localStorage.get('untauglichkeitsGrund')}</Text>
        </Page>
    </Document>
);