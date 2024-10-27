'use client'

import Footer from "@/app/components/Footer/Footer"
import Header from "@/app/components/Header/Header"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Card, Col, Image, Row } from "react-bootstrap"

export default function Page({ params }) {

  const [detalhes, setDetalhes] = useState([])

  useEffect(() => {
    const produto = JSON.parse(localStorage.getItem('produtos')) || []
    const dados = produto.find(item => item.id == params.id)
    setDetalhes(dados)
  }, [])

  console.log(detalhes)
  return (
    <>
      <Header />
        <Image src={detalhes.imagem} width={100} height={100} alt="cing"></Image>
      <Footer />
    </>
  )
}
