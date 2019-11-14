import React, {Component} from "react";
import {Document, Page, PDFDownloadLink, StyleSheet, Text, View} from "@react-pdf/renderer";
import localStorage from "local-storage";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import {NavLink} from "react-router-dom";

const TransitionAlertPopup = React.forwardRef(function TransitionAlertPopup(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

class Absenden extends Component {

    constructor(props) {
        super(props);
        this.handlePopupZurStartseite = this.handlePopupZurStartseite.bind(this);
        this.handlePopupAbschliessenClose = this.handlePopupAbschliessenClose.bind(this);

        //Define the state of this component.
        this.state = {
            zurStartseitePopupOpen: false
        };
    }


    //after download is done, popup is opened to ask if user wants to go to startseite
    handlePopupZurStartseite = e => {
        this.setState({
            zurStartseitePopupOpen: true
        });
    };


    //closes the "Abschliessen"-Popup when button "Nein" is chosen
    handlePopupAbschliessenClose = e => {
        this.setState({
            zurStartseitePopupOpen: false
        });
    };


    // when download is done, this poup asks user if he wants to go back to the Startseite
    showPopupAbschliessen() {
        return (
            <div>
                <Dialog
                    open={this.state.zurStartseitePopupOpen}
                    TransitionComponent={TransitionAlertPopup}
                    keepMounted
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle style={{background: '#EC4622', color: 'white'}}
                                 id="alert-dialog-slide-title">{"Wollen Sie die Sozialanamnese schliessen?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Die Sozialanamnese wurde als PDF heruntergeladen. Wollen Sie nun zur Startseite
                            zurückkehren?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handlePopupAbschliessenClose} color="primary">Nein</Button>
                        <NavLink exact to="/" style={{"text-decoration": "none"}}>
                            <Button onClick={this.handlePopupAbschliessenClose} color="primary">Ja</Button>
                        </NavLink>
                    </DialogActions>
                </Dialog>
            </div>)
    }

    render() {
        return (
            <div>
                <div>{this.showPopupAbschliessen()}</div>
                <div>
                    <p>Vielen Dank für das Ausfüllen der Sozialanamnese!</p>
                    <br/>
                    <p>Bitte überprüfen Sie anhand der Fortschrittsanzeige am oberen Bildschirmrand, ob Sie alle
                        Abschnitte vollständig ausgefüllt
                        haben. Alle Schritte sollten mit einem Häkchen markiert sein. Ist dies nicht der Fall, so kehren
                        Sie bitte zum jeweiligen
                        Schritt zurück und ergänzen Sie dort die Angaben. Danach können Sie wieder auf den letzten
                        Schritt klicken.</p>
                    <br/>
                    <p>Sind alle Abschnitte vollständig, so laden Sie die Daten bitte herunter, indem Sie unten auf die
                        dafür vorgesehene Schaltfläche klicken.</p>
                    <br/><br/><br/><br/><br/><br/><br/>

                    <div hidden={false}>

                        <PDFDownloadLink document={<CobediasDocument/>} fileName={localStorage.get('Vorname')+"_"+localStorage.get('Nachname')+"_"+"Sozialanamnese.pdf"}>

                            <div className="SozialanamneseSendButton">
                                <Button
                                    size="medium"
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handlePopupZurStartseite}
                                >
                                    Daten herunterladen
                                    {({loading}) => (loading ? 'Loading document...' : '')}
                                </Button>
                            </div>

                        </PDFDownloadLink>
                    </div>
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

//only writes gender of me to PDF if the gender was set
function getGeschlecht() {
    if ((localStorage.get('me_gender')) && (localStorage.get('me_gender') !== '') && (localStorage.get('me_gender') !== 'null')) {
        return (
            <Text style={PDFstyles.section}>{localStorage.get('me_gender')}</Text>
        )
    }
}

//only writes gelernter  Beruf to PDF if it was entered
function getGelernterBeruf() {
    if ((localStorage.get('gelernterBeruf')) && (localStorage.get('gelernterBeruf') !== '') && (localStorage.get('gelernterBeruf') !== 'null')) {
        return (
            <Text style={PDFstyles.section}>Gelernter Beruf: {localStorage.get('gelernterBeruf')}</Text>
        )
    }
}

//only writes aktueller  Beruf to PDF if it was entered
function getAktuellerBeruf() {
    if ((localStorage.get('aktuellerBeruf')) && (localStorage.get('aktuellerBeruf') !== '') && (localStorage.get('aktuellerBeruf') !== 'null')) {
        return (
            <Text style={PDFstyles.section}>Aktueller Beruf: {localStorage.get('aktuellerBeruf')}</Text>
        )
    }
}

//only writes Arbeitsfaehigkeit to PDF if it was entered
function getArbeitsfaehigkeit() {
    if ((localStorage.get('arbeitsfaehigkeit')) && (localStorage.get('arbeitsfaehigkeit') !== '') && (localStorage.get('arbeitsfaehigkeit') !== 'null')) {
        return (
            <Text style={PDFstyles.section}>Arbeitsfähigkeit: {localStorage.get('arbeitsfaehigkeit')}</Text>
        )
    }
}

//only writes Arbeitspensum to PDF if it was entered
function getArbeitspensum() {
    if ((localStorage.get('arbeitspensum')) && (localStorage.get('arbeitspensum') !== '') && (localStorage.get('arbeitspensum') !== 'null')) {
        return (
            <Text style={PDFstyles.section}>Arbeitspensum: {localStorage.get('arbeitspensum')}</Text>
        )
    }
}

//only writes the date of the Arbeitslosigkeit to PDF if it was entered
function getDateArbeitslosigkeit() {
    if ((localStorage.get('dateArbeitslosigkeit')) && (localStorage.get('dateArbeitslosigkeit') !== '') && (localStorage.get('dateArbeitslosigkeit') !== 'null')) {
        return (
            <Text style={PDFstyles.section}>Datum Arbeitslosigkeit: {localStorage.get('dateArbeitslosigkeit')}</Text>
        )
    }
}

//only writes the date of pensioniert to PDF if it was entered
function getDatePensioniert() {
    if ((localStorage.get('datePensioniert')) && (localStorage.get('datePensioniert') !== '') && (localStorage.get('datePensioniert') !== 'null')) {
        return (
            <Text style={PDFstyles.section}>Datum pensioniert: {localStorage.get('datePensioniert')}</Text>
        )
    }
}

//only writes the date of the IV-Rente to PDF if it was entered
function getDateIVRente() {
    if ((localStorage.get('dateIVRente')) && (localStorage.get('dateIVRente') !== '') && (localStorage.get('dateIVRente') !== 'null')) {
        return (
            <Text style={PDFstyles.section}>Datum IV-Rente: {localStorage.get('dateIVRente')}</Text>
        )
    }
}

//only writes the date of the Arbeitsunfaehigkeit (von) to PDF if it was entered
function getDateArbeitsunfaehigkeitVon() {
    if ((localStorage.get('dateArbeitsunfaehigkeitVon')) && (localStorage.get('dateArbeitsunfaehigkeitVon') !== '') && (localStorage.get('dateArbeitsunfaehigkeitVon') !== 'null')) {
        return (
            <Text style={PDFstyles.section}>Arbeitsunfähig seit: {localStorage.get('dateArbeitsunfaehigkeitVon')}</Text>
        )
    }
}

//only writes the date of the Arbeitsunfaehigkeit (bis) to PDF if it was entered
function getDateArbeitsunfaehigkeitBis() {
    if ((localStorage.get('dateArbeitsunfaehigkeitBis')) && (localStorage.get('dateArbeitsunfaehigkeitBis') !== '') && (localStorage.get('dateArbeitsunfaehigkeitBis') !== 'null')) {
        return (
            <Text style={PDFstyles.section}>Arbeitsunfähig bis: {localStorage.get('dateArbeitsunfaehigkeitBis')}</Text>
        )
    }
}

//only writes the Erkrankung to PDF if it was entered
function getErkrankung() {
    if ((localStorage.get('erkrankung')) && (localStorage.get('erkrankung') !== '') && (localStorage.get('erkrankung') !== 'null')) {
        return (
            <Text style={PDFstyles.section}>Erkrankung: {localStorage.get('erkrankung')}</Text>
        )
    }
}

//only writes the Arbeitsunfaehigkeit in % to PDF if it was entered
function getArbeitsunfaehigkeitInProzent() {
    if ((localStorage.get('arbeitsunfaehigkeitInProzent')) && (localStorage.get('arbeitsunfaehigkeitInProzent') !== '') && (localStorage.get('arbeitsunfaehigkeitInProzent') !== 'null')) {
        return (
            <Text style={PDFstyles.section}>Arbeitsunfähigkeit in %: {localStorage.get('arbeitsunfaehigkeitInProzent')}</Text>
        )
    }
}

//only writes the Untauglichkeitsgrund to PDF if it was entered
function getUntauglichkeitsgrund() {
    if ((localStorage.get('untauglichkeitsGrund')) && (localStorage.get('untauglichkeitsGrund') !== '') && (localStorage.get('untauglichkeitsGrund') !== 'null')) {
        return (
            <Text style={PDFstyles.section}>Grund für Untauglichkeit: {localStorage.get('untauglichkeitsGrund')}</Text>
        )
    }
}

//only writes Wohnsituation to PDF if it was entered
function getWohnsituation() {
    if ((localStorage.get('wohnsituation')) && (localStorage.get('wohnsituation') !== '') && (localStorage.get('wohnsituation') !== 'null')) {
        return (
            <Text style={PDFstyles.section}>Wohnsituation: {localStorage.get('wohnsituation')}</Text>
        )
    }
}

//only writes the text for the andere Wohnsituation to PDF if it was entered
function getAndereWohnText() {
    if ((localStorage.get('andereWohnText')) && (localStorage.get('andereWohnText') !== '') && (localStorage.get('andereWohnText') !== 'null')) {
        return (
            <Text style={PDFstyles.section}>Beschreibung der "anderen Wohnsituation": {localStorage.get('andereWohnText')}</Text>
        )
    }
}

//only writes Zivilstand to PDF if it was entered
function getZivilstand() {
    if ((localStorage.get('zivilstand')) && (localStorage.get('zivilstand') !== '') && (localStorage.get('zivilstand') !== 'null')) {
        return (
            <Text style={PDFstyles.section}>Zivilstand: {localStorage.get('zivilstand')}</Text>
        )
    }
}

//only writes the text for the anderer Zivilstand to PDF if it was entered
function getAndererZivilstand() {
    if ((localStorage.get('andereText')) && (localStorage.get('andereText') !== '') && (localStorage.get('andereText') !== 'null')) {
        return (
            <Text style={PDFstyles.section}>Beschreibung des "anderen Zivilstands": {localStorage.get('andereText')}</Text>
        )
    }
}

//only writes PatientenverfuegungExistiert to PDF if it was entered
function getPatVerfuegungExistiert() {
    if ((localStorage.get('patVerfuegungExistiert')) && (localStorage.get('patVerfuegungExistiert') !== '') && (localStorage.get('patVerfuegungExistiert') !== 'null')) {
        return (
            <Text style={PDFstyles.section}>Patientenverfügung existiert: {localStorage.get('patVerfuegungExistiert')}</Text>
        )
    }
}

//only writes "Patientenverfuegung bei" to PDF if it was entered
function getPatVerfuegungBei() {
    if ((localStorage.get('patVerfuegungBei')) && (localStorage.get('patVerfuegungBei') !== '') && (localStorage.get('patVerfuegungBei') !== 'null')) {
        return (
            <Text style={PDFstyles.section}>Patientenverfügung hinterlegt bei: {localStorage.get('patVerfuegungBei')}</Text>
        )
    }
}

//only writes VorsorgeauftragExistiert to PDF if it was entered
function getVorsorgeauftragExistiert() {
    if ((localStorage.get('vorsorgeauftragExistiert')) && (localStorage.get('vorsorgeauftragExistiert') !== '') && (localStorage.get('vorsorgeauftragExistiert') !== 'null')) {
        return (
            <Text style={PDFstyles.section}>Vorsorgeauftrag existiert: {localStorage.get('vorsorgeauftragExistiert')}</Text>
        )
    }
}

//only writes "Vorsorgeauftrag bei" to PDF if it was entered
function getVorsorgeauftragBei() {
    if ((localStorage.get('vorsorgeauftragBei')) && (localStorage.get('vorsorgeauftragBei') !== '') && (localStorage.get('vorsorgeauftragBei') !== 'null')) {
        return (
            <Text style={PDFstyles.section}>Vorsorgeauftrag hinterlegt bei: {localStorage.get('vorsorgeauftragBei')}</Text>
        )
    }
}


//Document which will be downloaded when clicking the blue Link. Here all Local storage variables need to be listed.
//TODO: improve design of downloaded PDF (e.g. insert line breaks, set title...)
const CobediasDocument = () => (
    <Document>
        <Page size="A4" style={PDFstyles.page}>
            <View>
                <Text style={PDFstyles.section}>Nachname, Vorname (Geschlecht): {localStorage.get('Nachname')}, {localStorage.get('Vorname')} ({getGeschlecht()})</Text>
                <Text style={PDFstyles.heading}>Berufstätigkeit</Text>
                {getGelernterBeruf()}
                {getAktuellerBeruf()}
                {getArbeitsfaehigkeit()}
                {getArbeitspensum()}
                {getDateArbeitslosigkeit()}
                {getDatePensioniert()}
                {getDateIVRente()}
                {getDateArbeitsunfaehigkeitVon()}
                {getDateArbeitsunfaehigkeitBis()}
                {getErkrankung()}
                {getArbeitsunfaehigkeitInProzent()}

                <Text style={PDFstyles.heading}>Hobbies</Text>
                <Text style={PDFstyles.section}>Hobbies: {localStorage.get('hobbies')}</Text>

                <Text style={PDFstyles.heading}>Militärdienst</Text>
                <Text style={PDFstyles.section}>Militärdienst wurde gemacht: {String(localStorage.get('militaerdienstGemacht'))}</Text>
                {getUntauglichkeitsgrund()}

                <Text style={PDFstyles.heading}>Wohnsituation</Text>
                {getWohnsituation()}
                {getAndereWohnText()}

                <Text style={PDFstyles.heading}>Bezugspersonen</Text>
                {getZivilstand()}
                {getAndererZivilstand()}
                <Text style={PDFstyles.section}>Nahestehende Person(en): {localStorage.get('nahePersonen')}</Text>
                {getPatVerfuegungExistiert()}
                {getPatVerfuegungBei()}
                {getVorsorgeauftragExistiert()}
                {getVorsorgeauftragBei()}

                <Text style={PDFstyles.heading}>Bemerkungen</Text>
                <Text style={PDFstyles.section}>Bemerkungen: {localStorage.get('bemerkungen')}</Text>

            </View>
        </Page>
    </Document>
);