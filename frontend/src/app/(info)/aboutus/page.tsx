import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

export default function AboutUs() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">About Section</h1>
      <p className="text-lg mb-4">We embarked on the journey of creating our eCommerce platform driven by a passion for enhancing customer experiences and meeting unmet needs in the market. Inspired by the transformative power of scents and their ability to evoke emotions and memories, we chose to specialize in selling perfumes. Perfumes hold a unique allure, offering individuals a tangible way to express their personality, style, and mood.</p>
      <p className="text-lg mb-4">Through our eCommerce venture, we aim to curate a diverse selection of high-quality perfumes, catering to a wide range of preferences and tastes. By offering a carefully curated collection and prioritizing customer satisfaction, we aspire to create a seamless shopping experience that not only provides access to exceptional fragrances but also fosters moments of joy and self-expression for our valued customers.</p>
      <Button href='https://github.com/Yandah1/Noble-perfumes' icon={<GithubOutlined />} type='link'>
        GitHub Repository
      </Button>
      <Button href='https://www.linkedin.com/in/itumeleng-malgas-3a9642b2/' icon={<LinkedinOutlined />} type='link'>
        Itumeleng
      </Button>
      <Button href='https://www.linkedin.com' icon={<LinkedinOutlined />} type='link'>
        Yandah
      </Button>
    </div>
  )
}