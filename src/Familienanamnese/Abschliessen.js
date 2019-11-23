import React, {Component} from "react";
import styles from './FamilyTree.module.css';
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import localStorage from "local-storage";
import familyHelpers from "./FamilyData";

import {Document, Page, PDFDownloadLink, StyleSheet, Text} from "@react-pdf/renderer";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import domtoimage from "dom-to-image";
import ReactFamilyTree from "react-family-tree";
import {IFamilyExtNode} from "relatives-tree";
import FamilyNode from "./FamilyNode";

const TransitionAlertPopup = React.forwardRef(function TransitionAlertPopup(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const myID = 'me';
const WIDTH = 150;
const HEIGHT = 150;
const RESIZE = 0.7;

const PDFstyles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        margin: 10,
        marginTop: 40,
        marginLeft: 15
    },
    text: {
        margin: 2,
        marginLeft: 25,
        fontSize: 11,
        textAlign: 'justify',
    },
    header: {
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});

export class Abschliessen extends Component {

    constructor(props) {
        super(props);
        this.handlePopupZurStartseite = this.handlePopupZurStartseite.bind(this);
        this.handlePopupAbschliessenClose = this.handlePopupAbschliessenClose.bind(this);

        //Define the state of this component.
        this.state = {
            faZurStartseitePopupOpen: false
        };
    }

    handlePopupZurStartseite = e => {
        this.setState({
            faZurStartseitePopupOpen: true
        });

        setTimeout(function () {
            document.getElementById('FamilyTreeID').style.opacity = 1;
            domtoimage.toPng(document.getElementById('FamilyTreeID'))
                .then(function (dataUrl) {
                    var link = document.createElement('a');
                    link.download = localStorage.get('Vorname') + "_" + localStorage.get('Nachname') + "_" + "Stammbaum.png";
                    link.href = dataUrl;
                    link.click();
                    document.getElementById('FamilyTreeID').style.opacity = 0;
                });
        }, 1000);
    };

    handlePopupAbschliessenClose = e => {
        this.setState({
            faZurStartseitePopupOpen: false
        });
    };

    getName(node) {
        if (node.spitzname && node.spitzname !== '') {
            return node.spitzname
        } else if (node.vorname && node.vorname !== '') {
            return node.vorname;
        } else if (node.id === 'me') {
            return localStorage.get("Vorname");
        } else {
            return this.getVerwandtschaftsgrad(node);
        }
    }

    getVerwandtschaftsgrad(node) {
        console.log("--> Get Verwandtschaft for :" + node.id);
        if (node.id === 'myMother') {
            return 'Mutter';
        } else if (node.id === 'myFather') {
            return 'Vater';
        } else if (node.id.substr(0, 5) === 'child') {
            if (familyHelpers.getFamilyMemberByID(node.id).gender === 'female') {
                return 'Tochter';
            } else {
                return 'Sohn';
            }
        } else if (node.id.substr(0, 6) === 'spouse') {
            if (familyHelpers.getFamilyMemberByID(node.id).gender === 'female') {
                return 'Partnerin';
            } else {
                return 'Partner';
            }
        } else if (node.id.substr(0, 7) === 'sibling') {
            if (familyHelpers.getFamilyMemberByID(node.id).gender === 'female') {
                return 'Schwester';
            } else {
                return 'Bruder';
            }
        } else {
            return 'Andere'
        }
    }

    showPopupAbschliessen() {
        return (
            <div>
                <Dialog
                    open={this.state.faZurStartseitePopupOpen}
                    TransitionComponent={TransitionAlertPopup}
                    keepMounted
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle style={{background: '#EC4622', color: 'white'}}
                                 id="alert-dialog-slide-title">{"Wollen Sie die Familienanamnese schliessen?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description" style={{color: "black"}}>
                            Die Familienanamnese wurde als PDF heruntergeladen. Wollen Sie nun zur Startseite
                            zurückkehren?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handlePopupAbschliessenClose} color="primary">Nein</Button>
                        <NavLink exact to="/Home" style={{"text-decoration": "none"}}>
                            <Button onClick={this.handlePopupAbschliessenClose} color="primary">Ja</Button>
                        </NavLink>
                    </DialogActions>
                </Dialog>
            </div>)
    }

    render() {
        return (
            <div>
                <div style={{width: "100%"}}>
                    <div className="Titel">
                        <h1 style={{display: 'inline-block'}}>Cobedias 2.0 - Familienanamnese</h1>

                        <NavLink exact to="/Home" style={{"text-decoration": "none"}}>
                            <Button variant="outlined" style={{
                                float: 'right',
                                marginRight: '5%',
                                color: 'white',
                                borderColor: 'white'
                            }}>Home</Button>
                        </NavLink>
                        <NavLink exact to="/Sozialanamnese" style={{"text-decoration": "none"}}>
                            <Button variant="outlined" style={{
                                float: 'right',
                                marginRight: '1%',
                                color: 'white',
                                borderColor: 'white'
                            }}>Sozialanamnese</Button>
                        </NavLink>
                    </div>
                    <div style={{opacity: '0'}}>
                        <div style={{opacity: '0'}} id="FamilyTreeID">

                            <ReactFamilyTree
                                nodes={familyHelpers.getFamilyData()}
                                rootId={myID}
                                width={WIDTH}
                                height={HEIGHT}
                                canvasClassName={styles.tree}
                                renderNode={(node: IFamilyExtNode) => (
                                    <FamilyNode
                                        key={node.id}
                                        node={node}
                                        isRoot={node.id === myID}
                                        style={{
                                            width: WIDTH * RESIZE,
                                            height: HEIGHT * RESIZE,
                                            transform: `translate(${node.left * (WIDTH / 2)}px, ${node.top * (HEIGHT / 2)}px)`,
                                            padding: `${WIDTH * ((1 - RESIZE) / 2)}px`,
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div>{this.showPopupAbschliessen()}</div>
                    <div className="FamilienanamneseDatenHerunterladen">
                        <p>Vielen Dank für das Ausfüllen der Familienanamnese!</p>
                        <br/>
                        <p>Bitte laden Sie die Daten mit "DATEN HERUNTERLADEN" noch herunter.</p>
                        <br/>
                        <br/><br/><br/><br/><br/><br/><br/>
                    </div>
                    <div className="SozialanamneseSendButton">
                        <PDFDownloadLink document={
                            <Document>
                                <Page size="A4" style={PDFstyles.body} wrap={true}>
                                    <Text
                                        style={PDFstyles.header}>~ {localStorage.get('Nachname')}, {localStorage.get('Vorname')} ({localStorage.get
                                    ('me_gender')}) ~</Text>

                                    <Text style={PDFstyles.title}>Familienanamnese</Text>

                                    <Text style={PDFstyles.subtitle}>Stammbaum</Text>

                                    {familyHelpers.getFamilyData().map(member => (
                                        <Text style={PDFstyles.text}>
                                            ========================================================================
                                            {"\n"}{this.getName(member)} -- {this.getVerwandtschaftsgrad(member)} {"\n"}
                                            ____________________________________________________________________________
                                            {"\n"}Spitzname: {member.spitzname} {"\n"}
                                            Vorname: {member.vorname} {"\n"}
                                            Nachname: {member.nachname} {"\n"}
                                            Geschlecht: {member.gender} {"\n"}
                                            Geburtsjahr: {member.geburtsjahr} {"\n"}
                                            Verstorben: {member.verstorben ? 'JA' : 'NEIN'} {"\n"}
                                            Todesjahr: {member.todesjahr} {"\n"}
                                            Todesursache: {member.todesursache} {"\n"}
                                            Durchlebte/aktuelle schwerwiegende Krankheiten: {member.gesundheitszustand} {"\n"}
                                            Blutsverwandt: {member.blutsverwandt ? 'JA': 'NEIN'} {"\n"}
                                            {"\n"}{"\n"}
                                        </Text>
                                    ))}

                                </Page>

                                <Page size="A4" style={PDFstyles.body}>
                                    <Text style={PDFstyles.subtitle}>Andere Personen</Text>
                                    {familyHelpers.getOtherFamilyData().map(member => (
                                        <Text style={PDFstyles.text}>
                                            ========================================================================
                                            {"\n"}{this.getName(member)} -- {this.getVerwandtschaftsgrad(member)} {"\n"}
                                            ___________________________________________________________________________
                                            {"\n"}Spitzname: {member.spitzname} {"\n"}
                                            Vorname: {member.vorname} {"\n"}
                                            Nachname: {member.nachname} {"\n"}
                                            Geschlecht: {member.gender} {"\n"}
                                            Geburtsjahr: {member.geburtsjahr} {"\n"}
                                            Verstorben: {member.verstorben ? 'JA' : 'NEIN'} {"\n"}
                                            Todesjahr: {member.todesjahr} {"\n"}
                                            Todesursache: {member.todesursache} {"\n"}
                                            Durchlebte/aktuelle schwerwiegende Krankheiten: {member.gesundheitszustand} {"\n"}
                                            Blutsverwandt: {member.blutsverwandt ? 'JA' : 'NEIN'} {"\n"}
                                            Verwandtschaftsgrad: {member.verwandtschaftsgrad} {"\n"}
                                            {"\n"}{"\n"}
                                        </Text>
                                    ))}

                                </Page>
                            </Document>
                        }
                                         fileName={localStorage.get('Vorname') + "_" + localStorage.get('Nachname') + "_" + "Familienanamnese.pdf"}>

                            <Button
                                size="medium"
                                variant="contained"
                                onClick={this.handlePopupZurStartseite} color="primary"
                                style={{margin: '10px', right: '10px', textDecoration: "none"}}
                            >
                                Daten herunterladen
                            </Button>

                        </PDFDownloadLink>
                    </div>

                </div>
            </div>
        );
    }
}

export default Abschliessen;
