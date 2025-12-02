import { useState, useEffect } from 'react'
import styles from '@/components/Cardboard/Cardboard.module.css'

interface CardboardProps {
  onCardClick: (cardName: string) => void
  level: number
}

interface CardProps {
  name: string
  imageUrl: string
  shuffle: () => void
  onCardClick: (cardName: string) => void
}

function Cardboard(props: CardboardProps) {
  const [cardsLoaded, setCardsLoaded] = useState<boolean>(false)
  const [cards, setCards] = useState<{ name: string; imageUrl: string }[]>([])

  useEffect(() => {
    fetchCards(props.level)
  }, [props.level])

  async function fetchCards(currentLevel: number) {
    const controller = new AbortController()
    try {
      setCardsLoaded(false)
      const res = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=12&offset=' +
          (currentLevel - 1) * 12,
        { signal: controller.signal }
      )
      if (!res.ok) {
        throw new Error(`Failed to fetch Pokémon list: ${res.status}`)
      }
      const poke = await res.json()

      // Fetch all Pokémon details in parallel instead of sequentially
      const cardPromises = poke.results.map(
        async (item: { name: string; url: string }) => {
          const detailRes = await fetch(item.url, {
            signal: controller.signal,
          })
          if (!detailRes.ok) {
            throw new Error(`Failed to fetch Pokémon: ${item.name}`)
          }
          const detailData = await detailRes.json()
          return {
            name: item.name,
            imageUrl: detailData.sprites.front_default,
          }
        }
      )

      const cardsArray = await Promise.all(cardPromises)
      setCards(cardsArray)
      setCardsLoaded(true)
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Fetch was cancelled')
        return
      }
      console.error('Error fetching cards:', error)
      setCardsLoaded(true)
    }
  }

  function shuffleCards() {
    setCards((prevCards) => {
      const shuffled = [...prevCards]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      return shuffled
    })
  }

  return (
    <div className={styles.cardboard}>
      {!cardsLoaded
        ? 'Loading cards...'
        : cards.map((card: { name: string; imageUrl: string }) => {
            return (
              <Card
                key={card.name}
                name={card.name}
                imageUrl={card.imageUrl}
                shuffle={shuffleCards}
                onCardClick={props.onCardClick}
              />
            )
          })}
    </div>
  )
}

function Card(props: CardProps) {
  return (
    <div
      className={styles.card}
      onClick={() => {
        props.shuffle()
        props.onCardClick(props.name)
      }}
    >
      <img src={props.imageUrl} alt={props.name} />
      <p>{props.name}</p>
    </div>
  )
}

export default Cardboard
