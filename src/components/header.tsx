import styles from '@/styles/header.module.css'

export default function Header() {
	return (
		<header className={styles.header}>
			<img src='brreg_logo.svg' alt='Logo' />
		</header>
	)
}