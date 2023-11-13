import React from "react";
import { Card, Container} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGithub, faLinkedin, faCodepen, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'


const Footer = () => {
    return (
        <Card className="Footer" bg="dark" data-bs-theme="dark">
          <Card.Header>Contact us</Card.Header>
          <Card.Body>
             <div className="Icons d-flex justify-content-evenly">
               <a href="https://github.com/IbrahimMohammedi"><FontAwesomeIcon icon={faGithub}/>
               </a> 
               <a href="https://www.linkedin.com/in/ibrahimmohammedi/"><FontAwesomeIcon icon={faLinkedin}/>
               </a>
               <a href="https://www.instagram.com/big.mama.technology/?hl=fr"><FontAwesomeIcon icon={faInstagram}/>
               </a> 
               <a href="https://www.facebook.com/bigmamaalger"><FontAwesomeIcon icon={faFacebook}/>
               </a> 
               <a href="https://big-mama.io"><FontAwesomeIcon icon={faCodepen}/>
               </a> 
             </div>
          </Card.Body>
          <Card.Footer className="text-muted"> © 2023, BIGmama. All rights reserved.</Card.Footer>
        </Card>
      );
    };

export default Footer;