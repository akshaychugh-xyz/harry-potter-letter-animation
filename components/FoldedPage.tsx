"use client"

import React from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"

interface FoldedPageProps {
  width?: number
  height?: number
  frontColor?: string
  insideColor?: string
  initialRotation?: number
  skewAngle?: number
}

export default function FoldedPage({
  width = 300,
  height = 400,
  frontColor = "#e0e0e0",
  insideColor = "white",
  initialRotation = 35,
  skewAngle = -15
}: FoldedPageProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [showAlternateText, setShowAlternateText] = useState(false)
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current)
      }
    }
  }, [])

  const handleMouseEnter = () => {
    if (!isOpen) return // Only work when page is open
    setIsHovering(true)
    hoverTimerRef.current = setTimeout(() => {
      setShowAlternateText(true)
    }, 1500)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
    }
  }

  // Updated animation variants
  const textContainerVariants = {
    initial: { 
      opacity: 1,
      rotateX: 0
    },
    exit: {
      opacity: 0,
      rotateX: 15,
      transition: { 
        duration: 1.2,
        staggerChildren: 0.08
      }
    },
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: { 
        duration: 1.2,
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  }

  const textLineVariants = {
    initial: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0 
    },
    exit: {
      opacity: 0,
      y: 100,
      rotateX: -90,
      transition: { 
        duration: 1.5,
        ease: [0.2, 0.6, 0.3, 1]
      }
    },
    enter: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { 
        duration: 1.5,
        ease: [0.2, 0.6, 0.3, 1]
      }
    }
  }

  const newTextVariants = {
    initial: { 
      opacity: 0,
      y: -30,
      scale: 0.9
    },
    animate: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.5
      }
    },
    exit: { 
      opacity: 0,
      y: 30,
      scale: 0.9
    }
  }

  const textStyle = {
    fontSize: '0.75rem',
    lineHeight: '1.4',
    color: '#1a1a1a'
  }

  const headingStyle = {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '0.75rem',
    color: '#1a1a1a'
  }

  const paragraphStyle = {
    marginBottom: '0.75rem',
    ...textStyle
  }

  const alternateContent = (
    <>
      <h2 style={headingStyle}>Hidden Insights: The Future</h2>
      <p style={paragraphStyle}>
        As we look beyond the current landscape, several emerging trends become apparent:
      </p>
      <ul style={{...textStyle, marginBottom: '0.75rem', paddingLeft: '1rem'}}>
        <li style={{marginBottom: '0.5rem'}}>Sovereign Identity Systems</li>
        <li style={{marginBottom: '0.5rem'}}>Zero-Knowledge Applications</li>
        <li style={{marginBottom: '0.5rem'}}>Decentralized Physical Infrastructure</li>
      </ul>
      <p style={paragraphStyle}>
        The convergence of these technologies will enable new forms of coordination 
        and value creation that were previously impossible.
      </p>
    </>
  )

  const renderPageContent = (content: React.ReactNode, isAlternate: boolean) => (
    <motion.div
      key={isAlternate ? 'alternate' : 'original'}
      variants={isAlternate ? newTextVariants : textContainerVariants}
      initial="initial"
      animate={isHovering && !isAlternate ? { scale: 1.02, transition: { duration: 2 } } : "animate"}
      exit="exit"
      style={{ 
        height: '100%',
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {!isAlternate ? (
        // Original content with falling effect
        React.Children.map(React.Children.toArray(content), (child, i) => (
          <motion.div 
            variants={textLineVariants}
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'center bottom'
            }}
          >
            {child}
          </motion.div>
        ))
      ) : (
        // New content
        content
      )}
    </motion.div>
  )

  return (
    <div 
      style={{ 
        width, 
        height, 
        position: 'relative',
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
      onClick={() => setIsOpen(!isOpen)}
      role="button"
      tabIndex={0}
      className="cursor-pointer"
    >
      {/* Back page (animated) */}
      <motion.div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: insideColor,
          borderRadius: '4px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
          transformOrigin: '0% 50%',
          zIndex: 1,
          padding: '1.25rem',
          overflow: 'hidden'
        }}
        animate={{
          rotateY: isOpen ? 0 : initialRotation,
          skewY: isOpen ? 0 : skewAngle,
          boxShadow: isOpen 
            ? '0 1px 3px rgba(0,0,0,0.12)' 
            : '0 4px 6px rgba(0,0,0,0.15)'
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut"
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence mode="wait">
          {!showAlternateText ? (
            renderPageContent(
              <>
                <h2 style={headingStyle}>2. NFTs: Beyond Digital Art</h2>
                <p style={paragraphStyle}>
                  While 2021 has seen explosive growth in NFT art and collectibles, we believe the true potential 
                  of NFTs lies in their utility for digital ownership and access rights. Key developments:
                </p>
                <ul style={{...textStyle, marginBottom: '0.75rem', paddingLeft: '1rem'}}>
                  <li style={{marginBottom: '0.5rem'}}>Gaming & Virtual Worlds: Play-to-earn models pioneered by Axie Infinity</li>
                  <li style={{marginBottom: '0.5rem'}}>Social Tokens: Community engagement and governance rights</li>
                  <li style={{marginBottom: '0.5rem'}}>Metaverse Land: Digital real estate and virtual experiences</li>
                </ul>
                <p style={paragraphStyle}>
                  The composability of NFTs with DeFi protocols (NFTFi) creates new possibilities for 
                  collateralization and fractionalization of high-value digital assets.
                </p>
                <h2 style={headingStyle}>3. Layer 2 Scaling Solutions</h2>
                <p style={paragraphStyle}>
                  Ethereum's scaling challenges have accelerated the development and adoption of L2 solutions:
                </p>
                <ul style={{...textStyle, paddingLeft: '1rem'}}>
                  <li style={{marginBottom: '0.5rem'}}>Optimistic Rollups: Arbitrum, Optimism</li>
                  <li style={{marginBottom: '0.5rem'}}>ZK-Rollups: StarkWare, zkSync</li>
                </ul>
              </>,
              false
            )
          ) : (
            renderPageContent(
              <>
                <h2 style={headingStyle}>4. Emerging Infrastructure</h2>
                <p style={paragraphStyle}>
                  The next wave of Web3 infrastructure is taking shape:
                </p>
                <ul style={{...textStyle, marginBottom: '0.75rem', paddingLeft: '1rem'}}>
                  <li style={{marginBottom: '0.5rem'}}>Decentralized Storage: Filecoin, Arweave</li>
                  <li style={{marginBottom: '0.5rem'}}>Cross-chain Messaging: LayerZero, Axelar</li>
                  <li style={{marginBottom: '0.5rem'}}>Privacy Solutions: Aztec, Mina Protocol</li>
                </ul>
                <p style={paragraphStyle}>
                  These foundational layers will enable the next generation of 
                  scalable and interoperable Web3 applications.
                </p>
              </>,
              true
            )
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Front page container (animated) */}
      <motion.div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transformOrigin: '0% 50%',
          zIndex: 2,
          transformStyle: 'preserve-3d'
        }}
        animate={{
          rotateY: isOpen ? -180 : 0,
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut"
        }}
      >
        {/* Front of the page */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: frontColor,
            borderRadius: '4px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
            backfaceVisibility: 'hidden',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <h1 
            style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              textAlign: 'center',
              lineHeight: '1.2',
              color: '#1a1a1a'
            }}
          >
            High Conviction
            <br />
            Web3 Thesis
            <br />
            {showAlternateText ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ textDecoration: 'line-through', opacity: 0.7 }}>2021</span>
                <span>2024</span>
              </div>
            ) : (
              <span>2021</span>
            )}
          </h1>
        </div>
        
        {/* Inside of the front page */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: insideColor,
            borderRadius: '4px',
            transform: 'rotateY(180deg)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
            backfaceVisibility: 'hidden',
            padding: '1.25rem',
            overflow: 'hidden'
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <AnimatePresence mode="wait">
            {!showAlternateText ? (
              renderPageContent(
                <>
                  <h2 style={headingStyle}>1. DeFi 2.0 Innovations</h2>
                  <p style={paragraphStyle}>
                    First-generation DeFi protocols have revealed both the potential and limitations of 
                    decentralized finance. Key trends for 2021-2022:
                  </p>
                  <ul style={{...textStyle, marginBottom: '0.75rem', paddingLeft: '1rem'}}>
                    <li style={{marginBottom: '0.5rem'}}>Protocol-Owned Liquidity (POL): OlympusDAO model</li>
                    <li style={{marginBottom: '0.5rem'}}>Fixed-Rate Lending: Element, Notional Finance</li>
                    <li style={{marginBottom: '0.5rem'}}>Real-World Asset (RWA) Integration</li>
                  </ul>
                  <p style={paragraphStyle}>
                    Institutional DeFi adoption is accelerating, with regulated entities seeking exposure 
                    through permissioned pools and KYC-compliant protocols.
                  </p>
                  <p style={paragraphStyle}>
                    Cross-chain interoperability solutions are becoming critical infrastructure, 
                    enabling capital efficiency across multiple blockchains.
                  </p>
                </>,
                false
              )
            ) : (
              renderPageContent(alternateContent, true)
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
} 