import Bar from '@/components/Bar'
import './index.scss'
function Home () {
  return (
    <div className='home'>
      <Bar
        title='三大框架使用度'
        xData={['vue', 'angular', 'react']}
        sData={[30, 50, 90]}
        style={{ width: '500px', height: '400px' }}
      ></Bar>

      <Bar
        title='三大框架使用度'
        xData={['vue', 'angular', 'react']}
        sData={[50, 60, 70]}
        style={{ width: '500px', height: '400px' }}
      ></Bar>
    </div>
  )
}

export default Home