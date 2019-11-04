import React, {Component} from "react";
import {Document, Page, PDFDownloadLink, StyleSheet, Text, View} from "@react-pdf/renderer";
import localStorage from "local-storage";

class Absenden extends Component {
    render() {
        return (
            <div>
                <p>Vielen Dank für das Ausfüllen der Sozialanamnese!</p>
                <br/>
                <p>Bitte überprüfen Sie anhand der Fortschrittsanzeige am oberen Bildschirmrand, ob Sie alle Abschnitte vollständig ausgefüllt
                haben. Alle Schritte sollten mit einem Häkchen markiert sein. Ist dies nicht der Fall, so kehren Sie bitte zum jeweiligen
                Schritt zurück und ergänzen Sie dort die Angaben. Danach können Sie wieder auf den letzten Schritt klicken.</p>
                <br/>
                <p>Sind alle Abschnitte vollständig, so senden Sie die Daten bitte an Ihren Arzt / Ihre Ärztin, indem Sie unten auf die dafür
                    vorgesehene Schaltfläche klicken.</p>
                <br/><br/><br/><br/><br/><br/><br/>

                <div hidden={false}>
                    <PDFDownloadLink document={<CobediasDocument/>} fileName="TestSozialanamnese.pdf">
                        {({loading}) => (loading ? 'Loading document...' : '.')}
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
    heading: {
        margin: 30,
        padding: 10,
        fontSize: 20,
    },
    section: {
        margin: 30,
        padding: 10,
        fontSize: 14,
        flexGrow: 1
    },
});


//Document which will be downloaded when clicking the blue Link. Here all Local storage variables need to be listed.
//TODO: improve design of downloaded PDF (e.g. insert line breaks, set title...)
const CobediasDocument = () => (
    <Document>
        <Page size="A4" style={PDFstyles.page}>
            <View>
                <Text style={PDFstyles.heading}>Berufstätigkeit</Text>
                <Text style={PDFstyles.section}>Gelernter Beruf: {localStorage.get('gelernterBeruf')}</Text>
                <Text style={PDFstyles.section}>Aktueller Beruf: {localStorage.get('aktuellerBeruf')}</Text>
                <Text style={PDFstyles.section}>Normal arbeitsfähig: {String(localStorage.get('normalArbeitsfaehig'))}</Text>
                <Text style={PDFstyles.section}>Arbeitslos: {String(localStorage.get('arbeitlos'))}</Text>
                <Text style={PDFstyles.section}>Pensioniert: {String(localStorage.get('pensioniert'))}</Text>
                <Text style={PDFstyles.section}>IV-Rente: {String(localStorage.get('iVRente'))}</Text>
                <Text style={PDFstyles.section}>Arbeitsunfähig: {String(localStorage.get('arbeitsunfaehig'))}</Text>
                <Text style={PDFstyles.section}>Arbeitspensum: {localStorage.get('arbeitspensum')}</Text>
                <Text style={PDFstyles.section}>Datum Arbeitslosigkeit: {localStorage.get('dateArbeitslosigkeit')}</Text>
                <Text style={PDFstyles.section}>Datum pensioniert: {localStorage.get('datePensioniert')}</Text>
                <Text style={PDFstyles.section}>Datum IV-Rente: {localStorage.get('dateIVRente')}</Text>
                <Text style={PDFstyles.section}>Arbeitsunfähig seit: {localStorage.get('dateArbeitsunfaehigkeitVon')}</Text>
                <Text style={PDFstyles.section}>Arbeitsunfähig bis: {localStorage.get('dateArbeitsunfaehigkeitBis')}</Text>
                <Text style={PDFstyles.section}>Erkrankung: {localStorage.get('erkrankung')}</Text>
                <Text style={PDFstyles.section}>Arbeitsunfähigkeit in %: {localStorage.get('arbeitsunfaehigkeitInProzent')}</Text>

                <Text style={PDFstyles.heading}>Hobbies</Text>
                <Text style={PDFstyles.section}>Hobbies: {localStorage.get('hobbies')}</Text>

                <Text style={PDFstyles.heading}>Militärdienst</Text>
                <Text style={PDFstyles.section}>Militärdienst wurde gemacht: {String(localStorage.get('militaerdienstGemacht'))}</Text>
                <Text style={PDFstyles.section}>Grund für Untauglichkeit: {localStorage.get('untauglichkeitsGrund')}</Text>

                <Text style={PDFstyles.heading}>Wohnsituation</Text>
                <Text style={PDFstyles.section}>Haus: {String(localStorage.get('haus'))}</Text>
                <Text style={PDFstyles.section}>Wohnung: {String(localStorage.get('wohnung'))}</Text>
                <Text style={PDFstyles.section}>Altersheim: {String(localStorage.get('altersheim'))}</Text>
                <Text style={PDFstyles.section}>Pflegeheim: {String(localStorage.get('pflegeheim'))}</Text>
                <Text style={PDFstyles.section}>Andere Wohnsituation: {String(localStorage.get('andere'))}</Text>
                <Text style={PDFstyles.section}>Beschreibung der "anderen Wohnsituation": {localStorage.get('andereWohnText')}</Text>

                <Text style={PDFstyles.heading}>Zivilstand</Text>
                <Text style={PDFstyles.section}>Ledig: {String(localStorage.get('ledig'))}</Text>
                <Text style={PDFstyles.section}>Verheiratet: {String(localStorage.get('verheiratet'))}</Text>
                <Text style={PDFstyles.section}>Verwitwet: {String(localStorage.get('verwitwet'))}</Text>
                <Text style={PDFstyles.section}>Geschieden: {String(localStorage.get('geschieden'))}</Text>
                <Text style={PDFstyles.section}>Anderer Zivilstand: {String(localStorage.get('andere'))}</Text>
                <Text style={PDFstyles.section}>Beschreibung des "anderen Zivilstands": {localStorage.get('andereText')}</Text>
                <Text style={PDFstyles.section}>Nahestehende Person(en): {localStorage.get('nahePersonen')}</Text>
                <Text style={PDFstyles.section}>Patientenverfügung existiert: {String(localStorage.get('patVerfuegungJa'))}</Text>
                <Text style={PDFstyles.section}>Patientenverfügung existiert nicht: {String(localStorage.get('patVerfuegungNein'))}</Text>
                <Text style={PDFstyles.section}>Patientenverfügung hinterlegt bei: {localStorage.get('patVerfuegungBei')}</Text>
                <Text style={PDFstyles.section}>Vorsorgeauftrag existiert: {String(localStorage.get('vorsorgeauftragJa'))}</Text>
                <Text style={PDFstyles.section}>Vorsorgeauftrag existiert nicht: {String(localStorage.get('vorsorgeauftragNein'))}</Text>
                <Text style={PDFstyles.section}>Vorsorgeauftrag hinterlegt bei: {localStorage.get('vorsorgeauftragBei')}</Text>

                <Text style={PDFstyles.heading}>Bemerkungen</Text>
                <Text style={PDFstyles.section}>Bemerkungen: {localStorage.get('bemerkungen')}</Text>

            </View>
        </Page>
    </Document>
);