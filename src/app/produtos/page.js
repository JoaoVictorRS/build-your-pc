'use client'

import Link from "next/link"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import { FaPlusCircle } from "react-icons/fa";

export default function Page() {
  return (
    <>
      <Header />

      <Link
        href="/computadores/form"
        className="btn btn-primary mb-3"
      >
        <FaPlusCircle /> Novo
      </Link>

      <Footer />
    </>
  )
}
