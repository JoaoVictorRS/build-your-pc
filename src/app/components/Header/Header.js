'use client'

import Link from "next/link"
import { Container, Dropdown, Nav, Navbar, NavDropdown } from "react-bootstrap"
import logo from "../../public/logo.png"
import Image from "next/image"
import "./style.css"
import { IoHardwareChipOutline, IoBuildOutline } from "react-icons/io5";
import { FaComputer } from "react-icons/fa6";
import { MdOutlineMouse } from "react-icons/md";
import { FaShoppingCart, FaUser, FaUsersCog } from "react-icons/fa";
import { useEffect, useState } from "react"
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/navigation"

export default function Header() {

  const [show, setShow] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const route = useRouter()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    setLoggedInUser(user);
  }, [])

  const showDropdown = () => setShow(true);
  const hideDropdown = () => setShow(false);

  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
    route.push('/')
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="header_background">
      <Container>
        <Navbar.Brand className="pe-5"><Link href="/"><Image width={150} src={logo} alt="logo" /></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="nav-link-custom me-4" href="/"><IoBuildOutline /> Monte seu PC</Nav.Link>
            <Nav.Link className="nav-link-custom me-4" href="/perifericos"><MdOutlineMouse /> Periféricos</Nav.Link>
            <Nav.Link className="nav-link-custom me-4" href="/computadores"><FaComputer /> Computadores</Nav.Link>
            <NavDropdown
              title={<span className="text-light"><IoHardwareChipOutline /> Hardware</span>}
              menuVariant="dark"
              className="NavDropdown-custom"
              show={show}
              onMouseEnter={showDropdown}
              onMouseLeave={hideDropdown}
            >
              <NavDropdown.Item href="/hardwares/processador">Processador</NavDropdown.Item>
              <NavDropdown.Item href="/hardwares/placa_mae">Placa-mãe</NavDropdown.Item>
              <NavDropdown.Item href="/hardwares/fontes">Fontes</NavDropdown.Item>
              <NavDropdown.Item href="/hardwares/coolers">Coolers</NavDropdown.Item>
              <NavDropdown.Item href="/hardwares/memoria_ram">Memória RAM</NavDropdown.Item>
              <NavDropdown.Item href="/hardwares/armazenamento_interno">Armazenamento Interno</NavDropdown.Item>
              <NavDropdown.Item href="/hardwares/placa_de_video">Placa de Vídeo</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ms-auto align-items-center">
            {loggedInUser ? (
              <>
                <div className="dropdown-wrapper">
                  <div onClick={handleToggleDropdown} className="dropdown-wrapper">
                    {loggedInUser.imagem_perfil === '' ? (
                      <FaUser size={25} className="text-warning" />
                    ) : (
                      <img src={loggedInUser.imagem_perfil} className="imagem_perfil" alt="Profile" />
                    )}
                  </div>
                  {dropdownOpen && (
                    <Dropdown.Menu show className="dropdown-menu-right p-2">
                      <Dropdown.Item className="mb-2">
                        <Link className="link-perfil" href={`/userDashboard/${loggedInUser.id}`}>Ver Perfil</Link>
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item className="bg-danger text-white sair-botao" onClick={handleLogoutClick}>
                        Sair <IoIosLogOut className="text-white" />
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  )}
                </div>
                {loggedInUser.email === "admin@admin.com" ? (
                  <Nav.Link href="/usersADM" className="ms-5">
                    <FaUsersCog size={25} className="text-white" />
                  </Nav.Link>
                ) : (
                  <p className="text-warning ms-3 mt-4">Olá, {loggedInUser.nome}</p>
                )}
              </>
            )
              :
              <Nav.Link href="/login" className="ms-5"><FaUser size={25} className="text-warning" /></Nav.Link>
            }
            <Nav.Link href="/carrinho" className="ms-5"><FaShoppingCart size={25} className="text-light" /></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
