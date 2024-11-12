import React, { Suspense } from 'react'
import Header from './Header'
import Footer from './Footer'

const LayoutPage = ({ children }) => {
    return (
        <>
            <Header />
            <Suspense fallback={<div>Chargement...</div>}>
            <main>{children}</main>
            </Suspense>
            <Footer />
        </>
    )
}

export default LayoutPage
