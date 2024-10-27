'use client'

import { Col, Container, Nav, Row } from "react-bootstrap"
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import './style.css'

export default function Footer() {
  return (
    <>
      <footer className="py-3 mt-4 footer_background">
        <Container className="py-2">
          <Row className="d-flex justify-content-between align-items-center">
            <Col md={4} className="d-flex align-items-center">
              <span className="mb-3 mb-md-0 text-white">© 2024 Build Your Computer (BYC)</span>
            </Col>

            <Col md={4}>
              <Nav className="justify-content-end list-unstyled d-flex">
                <Nav.Item as="li" className="ms-3">
                  <Nav.Link href="#" className="text-white">
                    Fale Conosco <BiSupport size={25} />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li" className="ms-3">
                  <Nav.Link href="#" className="text-white">
                    <FaInstagram size="25px" />
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  )
}
