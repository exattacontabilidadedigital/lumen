"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function DiagnosticoDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    porte: "",
    regimeTributario: "",
    desafio: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Dados do diagnóstico:", formData)
    // Aqui você pode adicionar a lógica para enviar os dados
    alert("Obrigado! Entraremos em contato em breve para dar continuidade ao seu diagnóstico.")
    setOpen(false)
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      empresa: "",
      porte: "",
      regimeTributario: "",
      desafio: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Diagnóstico Tributário Gratuito</DialogTitle>
          <DialogDescription className="text-base">
            Preencha os dados abaixo e nossa equipe entrará em contato para fazer um diagnóstico completo da situação
            tributária da sua empresa.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome completo *</Label>
            <Input
              id="nome"
              placeholder="Seu nome"
              required
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone *</Label>
            <Input
              id="telefone"
              type="tel"
              placeholder="(00) 00000-0000"
              required
              value={formData.telefone}
              onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="empresa">Nome da empresa *</Label>
            <Input
              id="empresa"
              placeholder="Sua empresa"
              required
              value={formData.empresa}
              onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="porte">Porte da empresa *</Label>
            <Select
              required
              value={formData.porte}
              onValueChange={(value) => setFormData({ ...formData, porte: value })}
            >
              <SelectTrigger id="porte">
                <SelectValue placeholder="Selecione o porte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mei">MEI</SelectItem>
                <SelectItem value="micro">Microempresa</SelectItem>
                <SelectItem value="pequena">Pequena Empresa</SelectItem>
                <SelectItem value="media">Média Empresa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="regime">Regime tributário atual *</Label>
            <Select
              required
              value={formData.regimeTributario}
              onValueChange={(value) => setFormData({ ...formData, regimeTributario: value })}
            >
              <SelectTrigger id="regime">
                <SelectValue placeholder="Selecione o regime" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simples">Simples Nacional</SelectItem>
                <SelectItem value="presumido">Lucro Presumido</SelectItem>
                <SelectItem value="real">Lucro Real</SelectItem>
                <SelectItem value="nao-sei">Não sei informar</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="desafio">Qual seu principal desafio tributário? *</Label>
            <Textarea
              id="desafio"
              placeholder="Conte um pouco sobre o que você precisa..."
              required
              value={formData.desafio}
              onChange={(e) => setFormData({ ...formData, desafio: e.target.value })}
              className="min-h-[100px]"
            />
          </div>

          <Button type="submit" className="w-full">
            Solicitar Diagnóstico Gratuito
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
