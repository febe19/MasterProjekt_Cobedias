import React, {Component} from "react";
import Box from "@material-ui/core/Box";
import FamilyTree from './FamilyTreeComponent'
import styles from './FamilyTree.module.css';

export class Stammbaum extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        return (
            <div>
                <div style={{width: "100%"}}>
                    <Box
                        display="flex"
                        justifyContent="flex-start"
                        m={1}
                        p={1}
                        bgcolor="background.paper"
                    >
                        <Box p={1}>
                            <img
                                src={require("../components/images/logo_cobedias.png")}
                                style={{width: "40%"}}
                                m={1}
                                p={1}
                            />
                        </Box>
                    </Box>

                    <div className={styles.root}>
                        <FamilyTree/>
                    </div>

                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        flexDirection="column"
                        alignItems="flex-end"
                        m={1}
                        p={1}
                        bgcolor="background.paper"
                    >
                        <Box p={1}>
                            <img
                                src={require("../components/images/weiblich_hinz.png")}
                                style={{width: "40%"}}
                                m={1}
                                p={1}
                            />
                            <img
                                src={require("../components/images/mänlich_hinz.png")}
                                style={{width: "45%"}}
                                m={1}
                                p={1}
                            />
                        </Box>
                        <Box p={1}>
                            <img
                                src={require("../components/images/weiblich_hinz.png")}
                                style={{width: "40%"}}
                                m={1}
                                p={1}
                            />
                            <img
                                src={require("../components/images/mänlich_hinz.png")}
                                style={{width: "45%"}}
                                m={1}
                                p={1}
                            />
                        </Box>
                        <Box p={1}>
                            <img
                                src={require("../components/images/andere.png")}
                                title="Halb"
                                style={{width: "30%"}}
                                m={2}
                                p={2}
                            />
                            <img
                                src={require("../components/images/andere.png")}
                                style={{width: "30%"}}
                                m={2}
                                p={2}
                            />
                        </Box>
                    </Box>
                </div>
            </div>
        );
    }
}

export default Stammbaum;
