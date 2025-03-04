import { Button } from '@digdir/designsystemet-react'
import Debug from './debug'
import './header.css'
import { LanguageIcon, MagnifyingGlassIcon, MenuHamburgerIcon, PersonIcon } from '@navikt/aksel-icons'

export default function Header() {
	return (
		<header className='header'>
			<img src='https://scf.brreg.no/bilder/BR_logo_black_english.svg' alt='Logo' width={300} height={37} />
			<div className='header-buttons'>
				<Debug />
				<Button variant='tertiary'>
					Language
					<LanguageIcon title="a11y-title" fontSize="1.5rem" />
				</Button>
				<Button variant='tertiary'>
					Search
					<MagnifyingGlassIcon title="a11y-title" fontSize="1.5rem" />
				</Button>
				<Button variant='tertiary'>
					Log in
					<PersonIcon title="a11y-title" fontSize="1.5rem" />
				</Button>
				<Button variant='tertiary'>
					Menu
					<MenuHamburgerIcon title="a11y-title" fontSize="1.5rem" />
				</Button>
			</div>
		</header>
	)
}