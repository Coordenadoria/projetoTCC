"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Save, CheckCircle, ArrowLeft } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

interface UnitConfiguration {
  unit_name: string
  unit_type: string
  cnes: string
  cnpj: string
  address: string
  phone: string
  email: string
  bed_capacity?: number
  specialties: string[]
  services: string[]
  operational_hours: Record<string, string>
  performance_evaluation_frequency: number
  wellness_evaluation_frequency: number
  manager_name: string
  manager_email: string
  manager_phone: string
  administrative_positions: string[]
}

const UNIT_TYPES = [
  { value: "hospital", label: "Hospital" },
  { value: "ubs", label: "Unidade Básica de Saúde (UBS)" },
  { value: "specialized", label: "Unidade Especializada" },
  { value: "administrative", label: "Unidade Administrativa" },
  { value: "emergency", label: "Pronto Socorro" },
  { value: "laboratory", label: "Laboratório" },
]

const SPECIALTIES = [
  "Cardiologia",
  "Neurologia",
  "Oncologia",
  "Pediatria",
  "Ginecologia",
  "Ortopedia",
  "Psiquiatria",
  "Dermatologia",
  "Oftalmologia",
  "Otorrinolaringologia",
  "Urologia",
  "Endocrinologia",
  "Gastroenterologia",
  "Pneumologia",
  "Reumatologia",
  "UTI",
  "Emergência",
  "Cirurgia Geral",
  "Anestesiologia",
  "Radiologia",
  "Patologia",
]

const SERVICES = [
  "Consultas Ambulatoriais",
  "Internação",
  "Cirurgia",
  "Diagnóstico por Imagem",
  "Laboratório",
  "Fisioterapia",
  "Psicologia",
  "Nutrição",
  "Farmácia",
  "Emergência 24h",
  "UTI",
  "Centro Cirúrgico",
  "Hemodiálise",
  "Quimioterapia",
  "Radioterapia",
  "Reabilitação",
  "Vacinação",
  "Coleta de Exames",
]

const ADMINISTRATIVE_POSITIONS = [
  "Diretor Geral",
  "Diretor Clínico",
  "Diretor Técnico",
  "Diretor Administrativo",
  "Chefe de Departamento",
  "Coordenador de Área",
  "Supervisor",
  "Oficial de Saúde",
  "Assessor Técnico",
  "Assessor Administrativo",
  "Assistente Administrativo",
  "Gerente de Recursos Humanos",
  "Gerente de Qualidade",
  "Gerente de Operações",
  "Gerente Financeiro",
  "Analista Administrativo",
  "Secretário Executivo",
]

export default function SetupPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("basic")
  const router = useRouter()

  const [config, setConfig] = useState<UnitConfiguration>({
    unit_name: "",
    unit_type: "",
    cnes: "",
    cnpj: "",
    address: "",
    phone: "",
    email: "",
    bed_capacity: 0,
    specialties: [],
    services: [],
    administrative_positions: [],
    operational_hours: {
      monday: "07:00-17:00",
      tuesday: "07:00-17:00",
      wednesday: "07:00-17:00",
      thursday: "07:00-17:00",
      friday: "07:00-17:00",
      saturday: "07:00-12:00",
      sunday: "Fechado",
    },
    performance_evaluation_frequency: 90,
    wellness_evaluation_frequency: 30,
    manager_name: "",
    manager_email: "",
    manager_phone: "",
  })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      router.push("/")
      return
    }

    // Verificar se é administrador
    if (currentUser.email !== "sessp.css@gmail.com") {
      router.push("/dashboard")
      return
    }

    setUser(currentUser)
    setLoading(false)
  }

  const handleInputChange = (field: string, value: any) => {
    setConfig((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSpecialtyToggle = (specialty: string) => {
    setConfig((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }))
  }

  const handleServiceToggle = (service: string) => {
    setConfig((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  const handleAdministrativePositionToggle = (position: string) => {
    setConfig((prev) => ({
      ...prev,
      administrative_positions: prev.administrative_positions.includes(position)
        ? prev.administrative_positions.filter((p) => p !== position)
        : [...prev.administrative_positions, position],
    }))
  }

  const handleOperationalHoursChange = (day: string, hours: string) => {
    setConfig((prev) => ({
      ...prev,
      operational_hours: {
        ...prev.operational_hours,
        [day]: hours,
      },
    }))
  }

  const validateForm = () => {
    if (!config.unit_name.trim()) return "Nome da unidade é obrigatório"
    if (!config.unit_type) return "Tipo da unidade é obrigatório"
    if (!config.cnes.trim()) return "CNES é obrigatório"
    if (!config.manager_name.trim()) return "Nome do responsável é obrigatório"
    if (!config.manager_email.trim()) return "Email do responsável é obrigatório"
    return null
  }

  const handleSave = async () => {
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setSaving(true)
    setError("")

    try {
      // Simular salvamento da configuração
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Aqui seria feita a chamada real para a API
      console.log("Configuração salva:", config)

      setSuccess(true)

      // Redirecionar para o dashboard após 2 segundos
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (err: any) {
      setError("Erro ao salvar configuração. Tente novamente.")
    }

    setSaving(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-gray-100">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Configuração Concluída!</h2>
            <p className="text-gray-600 mb-4">
              A unidade foi configurada com sucesso. Redirecionando para o dashboard...
            </p>
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mx-auto"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <img
                  src="/images/logo-secretaria-saude-sp.png"
                  alt="Secretaria da Saúde - São Paulo"
                  className="h-8 object-contain"
                />
                <h1 className="text-xl font-bold text-gray-900">SIGPS-IA</h1>
              </div>
              <div className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-blue-600" />
                <span className="text-blue-600 font-medium">Configuração da Unidade</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Configuração da Unidade</h2>
          <p className="text-gray-600 mt-2">Configure os dados da sua unidade para personalizar o SIGPS-IA</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="basic">Dados Básicos</TabsTrigger>
                <TabsTrigger value="services">Serviços</TabsTrigger>
                <TabsTrigger value="administrative">Administrativo</TabsTrigger>
                <TabsTrigger value="operations">Funcionamento</TabsTrigger>
                <TabsTrigger value="management">Gestão</TabsTrigger>
              </TabsList>

              {/* Dados Básicos */}
              <TabsContent value="basic" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="unit_name">Nome da Unidade *</Label>
                    <Input
                      id="unit_name"
                      value={config.unit_name}
                      onChange={(e) => handleInputChange("unit_name", e.target.value)}
                      placeholder="Ex: Hospital das Clínicas - Unidade Central"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit_type">Tipo da Unidade *</Label>
                    <Select value={config.unit_type} onValueChange={(value) => handleInputChange("unit_type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {UNIT_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnes">CNES (Cadastro Nacional de Estabelecimentos de Saúde) *</Label>
                    <Input
                      id="cnes"
                      value={config.cnes}
                      onChange={(e) => handleInputChange("cnes", e.target.value)}
                      placeholder="0000000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input
                      id="cnpj"
                      value={config.cnpj}
                      onChange={(e) => handleInputChange("cnpj", e.target.value)}
                      placeholder="00.000.000/0000-00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={config.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="(11) 0000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={config.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="contato@unidade.saude.sp.gov.br"
                    />
                  </div>
                  {(config.unit_type === "hospital" || config.unit_type === "emergency") && (
                    <div className="space-y-2">
                      <Label htmlFor="bed_capacity">Capacidade de Leitos</Label>
                      <Input
                        id="bed_capacity"
                        type="number"
                        value={config.bed_capacity}
                        onChange={(e) => handleInputChange("bed_capacity", Number.parseInt(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço Completo</Label>
                  <Textarea
                    id="address"
                    value={config.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Endereço completo da unidade"
                    rows={3}
                  />
                </div>
              </TabsContent>

              {/* Serviços */}
              <TabsContent value="services" className="space-y-6 mt-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Especialidades Oferecidas</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {SPECIALTIES.map((specialty) => (
                      <div key={specialty} className="flex items-center space-x-2">
                        <Checkbox
                          id={`specialty-${specialty}`}
                          checked={config.specialties.includes(specialty)}
                          onCheckedChange={() => handleSpecialtyToggle(specialty)}
                        />
                        <Label htmlFor={`specialty-${specialty}`} className="text-sm">
                          {specialty}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Serviços Disponíveis</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {SERVICES.map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={`service-${service}`}
                          checked={config.services.includes(service)}
                          onCheckedChange={() => handleServiceToggle(service)}
                        />
                        <Label htmlFor={`service-${service}`} className="text-sm">
                          {service}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Administrativo */}
              <TabsContent value="administrative" className="space-y-6 mt-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Cargos Administrativos</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Selecione os cargos administrativos existentes na sua unidade:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {ADMINISTRATIVE_POSITIONS.map((position) => (
                      <div key={position} className="flex items-center space-x-2">
                        <Checkbox
                          id={`position-${position}`}
                          checked={config.administrative_positions.includes(position)}
                          onCheckedChange={() => handleAdministrativePositionToggle(position)}
                        />
                        <Label htmlFor={`position-${position}`} className="text-sm">
                          {position}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Funcionamento */}
              <TabsContent value="operations" className="space-y-6 mt-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Horários de Funcionamento</h3>
                  <div className="space-y-3">
                    {Object.entries(config.operational_hours).map(([day, hours]) => (
                      <div key={day} className="flex items-center space-x-4">
                        <Label className="w-24 capitalize">
                          {day === "monday" && "Segunda"}
                          {day === "tuesday" && "Terça"}
                          {day === "wednesday" && "Quarta"}
                          {day === "thursday" && "Quinta"}
                          {day === "friday" && "Sexta"}
                          {day === "saturday" && "Sábado"}
                          {day === "sunday" && "Domingo"}
                        </Label>
                        <Input
                          value={hours}
                          onChange={(e) => handleOperationalHoursChange(day, e.target.value)}
                          placeholder="Ex: 07:00-17:00 ou 24h ou Fechado"
                          className="flex-1"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="performance_freq">Frequência de Avaliação de Performance (dias)</Label>
                    <Input
                      id="performance_freq"
                      type="number"
                      value={config.performance_evaluation_frequency}
                      onChange={(e) =>
                        handleInputChange("performance_evaluation_frequency", Number.parseInt(e.target.value) || 90)
                      }
                      placeholder="90"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wellness_freq">Frequência de Avaliação de Bem-estar (dias)</Label>
                    <Input
                      id="wellness_freq"
                      type="number"
                      value={config.wellness_evaluation_frequency}
                      onChange={(e) =>
                        handleInputChange("wellness_evaluation_frequency", Number.parseInt(e.target.value) || 30)
                      }
                      placeholder="30"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Gestão */}
              <TabsContent value="management" className="space-y-6 mt-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Responsável pela Unidade</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="manager_name">Nome Completo *</Label>
                      <Input
                        id="manager_name"
                        value={config.manager_name}
                        onChange={(e) => handleInputChange("manager_name", e.target.value)}
                        placeholder="Nome do responsável"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="manager_email">Email *</Label>
                      <Input
                        id="manager_email"
                        type="email"
                        value={config.manager_email}
                        onChange={(e) => handleInputChange("manager_email", e.target.value)}
                        placeholder="email@saude.sp.gov.br"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="manager_phone">Telefone</Label>
                      <Input
                        id="manager_phone"
                        value={config.manager_phone}
                        onChange={(e) => handleInputChange("manager_phone", e.target.value)}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {error && (
              <Alert variant="destructive" className="mt-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-end space-x-4 mt-8">
              <Button variant="outline" onClick={() => router.push("/dashboard")}>
                Cancelar
              </Button>
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700" disabled={saving}>
                {saving ? (
                  <>
                    <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Configuração
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
