import { useState } from "react"

interface EmployerProfileProps {
  employerName: string
  representativeName: string
  representativePosition: string
  phone: string
  address?: string
  scale?: string
  description?: string
  website?: string
  logoImage?: string
  coverImage?: string
}

const EmployerProfile: React.FC<EmployerProfileProps> = (props) => {
  const [edit, setEdit] = useState(false)
  const [form, setForm] = useState({
    employerName: props.employerName,
    representativeName: props.representativeName,
    representativePosition: props.representativePosition,
    phone: props.phone,
    address: props.address || '',
  })

  return (
    <div className="w-4/5 mt-14 mx-auto">
      <div className="relative">
        <img src={props.coverImage || '/default-cover.jpg'} className="rounded-t-2xl w-full h-64" />
        <img src={props.logoImage || '/default-logo.png'} className="rounded-full w-48 h-48 -bottom-1/3 absolute left-3 border-8" />
      </div>

      <div className="px-3 mt-24">
        <div className="text-3xl font-semibold flex justify-between">
          {edit ? (
            <input value={form.employerName} onChange={(e) => setForm({...form, employerName: e.target.value})}/>
          ) : (
            form.employerName
          )}
          <button onClick={() => setEdit(!edit)}>{edit ? '💾' : '✏️'}</button>
        </div>
        <div>{form.representativeName} - {form.representativePosition}</div>
        <div>📞 {form.phone}</div>
        <div>📍 {form.address}</div>
      </div>
    </div>
  )
}

export default EmployerProfile
