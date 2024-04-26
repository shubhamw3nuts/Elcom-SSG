import React from 'react'
import InnerBanner from '../InnerBanner'

const SimplePage = ({data}) => {
  return (
    <>
        <InnerBanner heading={data?.title}/>
        {data?.content && <div className="simplePage">
            <div className="container">
                <div className="elecombrief" dangerouslySetInnerHTML={{__html:data.content}}></div>
            </div>
        </div>}
    </>
  )
}

export default SimplePage