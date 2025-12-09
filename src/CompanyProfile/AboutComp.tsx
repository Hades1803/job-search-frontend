
import data from '../Data/Company'

const AboutComp = () => {
    const company:{[key:string]:any} = data.companyData
  return (
    <div className='flex flex-col gap-5'>
        {
            Object.keys(company).map((key,index)=>key!== 'Name' &&
                <div key={index}>
                    <div className='text-xl mb-3 font-semibold'>{key}</div>
                    {key !=='Website' && <div className='text-sm text-mine-shaft-300'>{key!=='Specialties'?company[key]:company[key].map((item:string,index:number)=>
                    <span key={index}> &bull; {item}</span>
                    )}</div>}
                    {key ==='Website' && <a href={company[key]} rel='noreferrer' target='_blank' className='text-sm text-bright-sun-400'>{company[key]}</a>}
                </div>
            )
        }
    </div>
  )
}

export default AboutComp