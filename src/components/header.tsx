import styles from '@/styles/header.module.css'
import Image from 'next/image'

export default function Header() {
	return (
		<header className={styles.header}>
			<Image src='brreg_logo.svg' alt='Logo' width={300} height={37}/>
		</header>
	)
}