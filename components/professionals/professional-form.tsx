"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Save, User, GraduationCap, Heart } from "lucide-react"

interface HealthUnit {
  id: string
  name: string
  type: string
  region?: string
}

interface Professional {
  id?: string
  full_name: string
  cpf: string
  birth_date?: string
  gender?: string
  phone?: string
  email?: string
  address?: string
  professional_registry: string
  position: string
  specialty?: string
  health_unit_id?: string
  employment_type?: string
  admission_date?: string
  weekly_hours?: number
}

interface ProfessionalFormProps {
  professional?: Professional
  onSave?: (professional: Professional) => void
  onCancel?: () => void
}

export function ProfessionalForm({ professional, onSave, onCancel }: ProfessionalFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [healthUnits, setHealthUnits] = useState<HealthUnit[]>([])

  // Estados do formulário
  const [formData, setFormData] = useState({
    full_name: professional?.full_name || "",
    cpf: professional?.cpf || "",
    birth_date: professional?.birth_date || "",
    gender: professional?.gender || "",
    phone: professional?.phone || "",
    email: professional?.email || "",
    address: professional?.address || "",
    professional_registry: professional?.professional_registry || "",
    position: professional?.position || "",
    specialty: professional?.specialty || "",
    health_unit_id: professional?.health_unit_id || "",
    employment_type: professional?.employment_type || "",
    admission_date: professional?.admission_date || "",
    weekly_hours: professional?.weekly_hours || 40,
  })

  useEffect(() => {
    loadHealthUnits()
  }, [])

  const loadHealthUnits = async () => {
    try {
      // Dados simulados das unidades de saúde
      const mockHealthUnits: HealthUnit[] = [
        {
          id: "1",
          name: "Hospital das Clínicas - SP",
          type: "Hospital",
          region: "Centro",
        },
        {
          id: "2",
          name: "UBS Vila Madalena",
          type: "UBS",
          region: "Zona Oeste",
        },
        {
          id: "3",
          name: "Hospital Municipal de Emergência",
          type: "Hospital",
          region: "Zona Leste",
        },
        {
          id: "4",
          name: "UBS Cidade Tiradentes",
          type: "UBS",
          region: "Zona Leste",
        },
        {
          id: "5",
          name: "Instituto do Coração - InCor",
          type: "Hospital Especializado",
          region: "Centro",
        },
        {
          id: "6",
          name: "UBS Jardim São Paulo",
          type: "UBS",
          region: "Zona Norte",
        },
        {
          id: "7",
          name: "Hospital Municipal do Campo Limpo",
          type: "Hospital",
          region: "Zona Sul",
        },
        {
          id: "8",
          name: "UBS Capão Redondo",
          type: "UBS",
          region: "Zona Sul",
        },
      ]

      setHealthUnits(mockHealthUnits)
    } catch (error) {
      console.error("Erro ao carregar unidades:", error)
      setError("Erro ao carregar unidades de saúde. Usando dados padrão.")

      // Fallback com dados básicos
      setHealthUnits([
        { id: "1", name: "Hospital das Clínicas - SP", type: "Hospital" },
        { id: "2", name: "UBS Vila Madalena", type: "UBS" },
      ])
    }
  }

  const validateCPF = (cpf: string) => {
    const cleanCPF = cpf.replace(/\D/g, "")
    if (cleanCPF.length !== 11) return false

    // Validação básica de CPF
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false

    return true
  }

  const formatCPF = (value: string) => {
    const cleanValue = value.replace(/\D/g, "")
    if (cleanValue.length <= 11) {
      return cleanValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    }
    return value
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    // Validações
    if (!formData.full_name.trim()) {
      setError("Nome completo é obrigatório")
      setLoading(false)
      return
    }

    if (!validateCPF(formData.cpf)) {
      setError("CPF inválido")
      setLoading(false)
      return
    }

    if (!formData.professional_registry.trim()) {
      setError("Registro profissional é obrigatório")
      setLoading(false)
      return
    }

    if (!formData.position.trim()) {
      setError("Cargo/função é obrigatório")
      setLoading(false)
      return
    }

    try {
      // Simular salvamento
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const cleanCPF = formData.cpf.replace(/\D/g, "")
      const savedProfessional: Professional = {
        id: professional?.id || `prof_${Date.now()}`,
        ...formData,
        cpf: cleanCPF,
        weekly_hours: Number(formData.weekly_hours),
      }

      setSuccess(professional?.id ? "Profissional atualizado com sucesso!" : "Profissional cadastrado com sucesso!")

      if (onSave) {
        setTimeout(() => {
          onSave(savedProfessional)
        }, 1000)
      }

      // Limpar formulário se for novo cadastro
      if (!professional?.id) {
        setFormData({
          full_name: "",
          cpf: "",
          birth_date: "",
          gender: "",
          phone: "",
          email: "",
          address: "",
          professional_registry: "",
          position: "",
          specialty: "",
          health_unit_id: "",
          employment_type: "",
          admission_date: "",
          weekly_hours: 40,
        })
      }
    } catch (err: any) {
      setError(err.message || "Erro ao salvar profissional")
    }

    setLoading(false)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="w-5 h-5 text-red-600" />
          <span>{professional?.id ? "Editar Profissional" : "Cadastrar Novo Profissional"}</span>
        </CardTitle>
        <CardDescription>Preencha os dados do profissional de saúde conforme as diretrizes da LGPD</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
              <TabsTrigger value="professional">Dados Profissionais</TabsTrigger>
              <TabsTrigger value="qualifications">Qualificações</TabsTrigger>
              <TabsTrigger value="wellness">Bem-estar</TabsTrigger>
            </TabsList>

            {/* Dados Pessoais */}
            <TabsContent value="personal" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Nome Completo *</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => handleInputChange("full_name", e.target.value)}
                    placeholder="Nome completo do profissional"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input
                    id="cpf"
                    value={formatCPF(formData.cpf)}
                    onChange={(e) => handleInputChange("cpf", e.target.value)}
                    placeholder="000.000.000-00"
                    maxLength={14}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birth_date">Data de Nascimento</Label>
                  <Input
                    id="birth_date"
                    type="date"
                    value={formData.birth_date}
                    onChange={(e) => handleInputChange("birth_date", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gênero</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o gênero" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Masculino">Masculino</SelectItem>
                      <SelectItem value="Feminino">Feminino</SelectItem>
                      <SelectItem value="Não binário">Não binário</SelectItem>
                      <SelectItem value="Prefiro não informar">Prefiro não informar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="email@saude.sp.gov.br"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço (Opcional)</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Endereço completo para análises regionais"
                  rows={3}
                />
              </div>
            </TabsContent>

            {/* Dados Profissionais */}
            <TabsContent value="professional" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="professional_registry">Registro Profissional *</Label>
                  <Input
                    id="professional_registry"
                    value={formData.professional_registry}
                    onChange={(e) => handleInputChange("professional_registry", e.target.value)}
                    placeholder="CRM, COREN, etc."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Cargo/Função *</Label>
                  <Select value={formData.position} onValueChange={(value) => handleInputChange("position", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o cargo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Médico">Médico</SelectItem>
                      <SelectItem value="Enfermeiro">Enfermeiro</SelectItem>
                      <SelectItem value="Técnico de Enfermagem">Técnico de Enfermagem</SelectItem>
                      <SelectItem value="Fisioterapeuta">Fisioterapeuta</SelectItem>
                      <SelectItem value="Psicólogo">Psicólogo</SelectItem>
                      <SelectItem value="Nutricionista">Nutricionista</SelectItem>
                      <SelectItem value="Farmacêutico">Farmacêutico</SelectItem>
                      <SelectItem value="Assistente Social">Assistente Social</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">Especialidade</Label>
                  <Input
                    id="specialty"
                    value={formData.specialty}
                    onChange={(e) => handleInputChange("specialty", e.target.value)}
                    placeholder="Cardiologia, UTI, Pediatria, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="health_unit_id">Unidade de Saúde</Label>
                  <Select
                    value={formData.health_unit_id}
                    onValueChange={(value) => handleInputChange("health_unit_id", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a unidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {healthUnits.map((unit) => (
                        <SelectItem key={unit.id} value={unit.id}>
                          {unit.name} - {unit.type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employment_type">Tipo de Vínculo</Label>
                  <Select
                    value={formData.employment_type}
                    onValueChange={(value) => handleInputChange("employment_type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de vínculo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CLT">CLT</SelectItem>
                      <SelectItem value="Estatutário">Estatutário</SelectItem>
                      <SelectItem value="Temporário">Temporário</SelectItem>
                      <SelectItem value="Terceirizado">Terceirizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admission_date">Data de Admissão</Label>
                  <Input
                    id="admission_date"
                    type="date"
                    value={formData.admission_date}
                    onChange={(e) => handleInputChange("admission_date", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weekly_hours">Carga Horária Semanal</Label>
                  <Input
                    id="weekly_hours"
                    type="number"
                    min="1"
                    max="60"
                    value={formData.weekly_hours}
                    onChange={(e) => handleInputChange("weekly_hours", e.target.value)}
                    placeholder="40"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Qualificações */}
            <TabsContent value="qualifications" className="space-y-4">
              <div className="text-center py-8 text-gray-500">
                <GraduationCap className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Seção de qualificações será implementada após o cadastro básico</p>
                <p className="text-sm">Incluirá formação acadêmica, certificações e cursos</p>
              </div>
            </TabsContent>

            {/* Bem-estar */}
            <TabsContent value="wellness" className="space-y-4">
              <div className="text-center py-8 text-gray-500">
                <Heart className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Dados de bem-estar serão coletados após o cadastro</p>
                <p className="text-sm">Incluirá questionários de saúde ocupacional e indicadores de bem-estar</p>
              </div>
            </TabsContent>
          </Tabs>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mt-4 border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end space-x-4 mt-6">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            )}
            <Button type="submit" className="bg-red-600 hover:bg-red-700" disabled={loading}>
              {loading ? (
                <>
                  <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {professional?.id ? "Atualizar" : "Cadastrar"}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
