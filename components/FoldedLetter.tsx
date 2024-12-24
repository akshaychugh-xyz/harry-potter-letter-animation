"use client"

import React from 'react'
import { motion } from "framer-motion"
import { useState, CSSProperties } from "react"

interface FoldedLetterProps {
  width?: number
  height?: number
  paperColor?: string
}

type FoldState = 'open' | 'folded' | 'closed'

export default function FoldedLetter({
  width = 300,
  height = 400,
  paperColor = "#f5f5f5",
}: FoldedLetterProps) {
  const [foldState, setFoldState] = useState<FoldState>('open')
  const sectionHeight = Math.floor(height/3)

  const MIDDLE_ROTATION = -85
  const angleInRadians = Math.abs(MIDDLE_ROTATION * Math.PI / 180)
  
  const middleBottomY = sectionHeight * Math.cos(angleInRadians)
  const middleBottomZ = sectionHeight * Math.sin(angleInRadians)

  const topFoldVariants = {
    open: { 
      rotateX: 0,
      y: 0,
      z: 0,
      transformOrigin: 'bottom',
      zIndex: 2,
      opacity: 1
    },
    folded: { 
      rotateX: 0,
      y: 0,
      z: 0,
      transformOrigin: 'bottom',
      zIndex: 2,
      opacity: 1
    },
    closed: {
      rotateX: 0,
      y: 0,
      z: 0,
      transformOrigin: 'bottom',
      zIndex: 2,
      opacity: 1
    }
  }

  const middleFoldVariants = {
    open: { 
      rotateX: 0,
      y: sectionHeight,
      z: 0,
      transformOrigin: 'top',
      zIndex: 3,
      opacity: 1
    },
    folded: { 
      rotateX: MIDDLE_ROTATION,
      y: sectionHeight,
      z: 0,
      transformOrigin: 'top',
      zIndex: 3,
      opacity: 1
    },
    closed: {
      rotateX: -179,
      y: sectionHeight / 2,
      z: 0,
      transformOrigin: 'top',
      zIndex: 1,
      opacity: 0
    }
  }

  const bottomFoldVariants = {
    open: { 
      rotateX: 0,
      y: sectionHeight * 2,
      z: 0,
      transformOrigin: 'top',
      zIndex: 1,
      opacity: 1
    },
    folded: { 
      rotateX: 0,
      y: sectionHeight + middleBottomY,
      z: -middleBottomZ,
      transformOrigin: 'top',
      zIndex: 1,
      opacity: 1
    },
    closed: {
      rotateX: -179,
      y: sectionHeight / 2,
      z: -0.1,
      transformOrigin: 'top',
      zIndex: 1,
      opacity: 0
    }
  }

  const sharedFoldStyles: CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: `${sectionHeight}px`,
    backgroundColor: 'white',
    borderRadius: '2px',
    backfaceVisibility: 'hidden',
    padding: '1rem',
    fontSize: '0.75rem',
    lineHeight: '1.4',
    color: '#1a1a1a',
    overflow: 'hidden',
    transformStyle: 'preserve-3d'
  }

  const handleClick = () => {
    setFoldState(current => {
      if (current === 'open') return 'folded'
      if (current === 'folded') return 'closed'
      return 'open'
    })
  }

  return (
    <div 
      style={{ 
        width, 
        height, 
        position: 'relative',
        perspective: '1200px',
        transformStyle: 'preserve-3d',
        cursor: 'pointer',
        transform: 'rotateY(-30deg) rotateX(15deg)',
        transformOrigin: 'center center'
      }}
      onClick={handleClick}
    >
      {[bottomFoldVariants, middleFoldVariants, topFoldVariants].map((variants, index) => (
        <motion.div
          key={index}
          style={{
            ...sharedFoldStyles,
            borderTop: index === 1 ? '1px solid rgba(0,0,0,0.1)' : 'none',
            borderBottom: index === 1 ? '1px solid rgba(0,0,0,0.1)' : 'none'
          }}
          initial="open"
          animate={foldState}
          variants={variants}
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
            opacity: { duration: 0.6, delay: 0.2 }
          }}
        >
          <div style={{ opacity: 0.8 }}>
            {index === 0 ? '2024...' : 
             index === 1 ? 'Web3 Thesis...' : 
             'High Conviction...'}
          </div>
        </motion.div>
      ))}
    </div>
  )
} 