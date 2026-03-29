import {Box, Link, Typography} from "@mui/material";

interface ImpressumContentProps {
    firstName?: string,
    lastName?: string,
    email?: string,
    addressStreet?: string,
    addressNumber?: number,
    zipCode?: number,
    city?: string
}

const defaultContent: ImpressumContentProps = {
    firstName: "Benjamin",
    lastName: "Kostka",
    email: "mail@ben-kostka.de",
    addressStreet: "Arcisstraße",
    addressNumber: 21,
    zipCode: 80333,
    city: "München"
}

export function ImpressumContent({
                                     firstName=defaultContent.firstName,
                                     lastName=defaultContent.lastName,
                                    email=defaultContent.email,
                                    addressStreet=defaultContent.addressStreet,
                                    addressNumber=defaultContent.addressNumber,
                                    zipCode=defaultContent.zipCode,
                                    city=defaultContent.city
                                 }: ImpressumContentProps){
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            m: 2,
            gap: 2
        }}>
            <Typography variant={"h3"}>Impressum</Typography>
            <Typography variant={"h4"}>Angaben gemäß § 5 DDG</Typography>
            <Box sx={{
                display: "flex",
                flexDirection: "column"
            }}>
                <Typography>{firstName} {lastName}</Typography>
                <Typography>{addressStreet} {addressNumber}</Typography>
                <Typography>{zipCode} {city}</Typography>
            </Box>

            <Typography variant={"h4"}>Kontakt</Typography>
            <Box sx={{
                    display: "flex",
                    flexDirection: "row"
            }}
            >
                <Typography>E-Mail:</Typography>
                <Link href={`mailto:${email}`}>{email}</Link>
            </Box>

            <Typography variant={"h4"}>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</Typography>
            <Box   sx={{display: "flex",
                flexDirection: "column"
            }}>
                <Typography>{firstName} {lastName}</Typography>
                <Typography>{addressStreet} {addressNumber}</Typography>
                <Typography>{zipCode} {city}</Typography>
            </Box>

            <Typography variant={"h4"}>EU-Streitschlichtung</Typography>
            <Typography variant={"body1"}>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                <Link href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</Link>.<br/>
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </Typography>

            <Typography variant={"h4"}>Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle</Typography>
            <Typography variant={"body1"}>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </Typography>
        </Box>
    );
}