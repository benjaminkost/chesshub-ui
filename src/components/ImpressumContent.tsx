import {Box, Link, Typography} from "@mui/material";
import {tokens} from "@/styles/theme";

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
            m: 4,
            gap: 3,
            backgroundColor: tokens.color.surfaceContainerLow,
            padding: 5,
            borderRadius: tokens.radius.xl,
        }}>
            <Typography variant={"h3"} sx={{ color: tokens.color.onSurface, fontFamily: tokens.font.display }}>Impressum</Typography>
            <Typography variant={"h4"} sx={{ color: tokens.color.onSurface, fontFamily: tokens.font.display }}>Angaben gemäß § 5 DDG</Typography>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                "& > p": { color: tokens.color.onSurfaceVariant }
            }}>
                <Typography>{firstName} {lastName}</Typography>
                <Typography>{addressStreet} {addressNumber}</Typography>
                <Typography>{zipCode} {city}</Typography>
            </Box>

            <Typography variant={"h4"} sx={{ color: tokens.color.onSurface, fontFamily: tokens.font.display }}>Kontakt</Typography>
            <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1
            }}
            >
                <Typography sx={{ color: tokens.color.onSurfaceVariant }}>E-Mail:</Typography>
                <Link href={`mailto:${email}`} sx={{ color: tokens.color.primary, "&:hover": { color: tokens.color.onPrimaryContainer } }}>{email}</Link>
            </Box>

            <Typography variant={"h4"} sx={{ color: tokens.color.onSurface, fontFamily: tokens.font.display }}>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</Typography>
            <Box   sx={{display: "flex",
                flexDirection: "column",
                "& > p": { color: tokens.color.onSurfaceVariant }
            }}>
                <Typography>{firstName} {lastName}</Typography>
                <Typography>{addressStreet} {addressNumber}</Typography>
                <Typography>{zipCode} {city}</Typography>
            </Box>

            <Typography variant={"h4"} sx={{ color: tokens.color.onSurface, fontFamily: tokens.font.display }}>EU-Streitschlichtung</Typography>
            <Typography variant={"body1"} sx={{ color: tokens.color.onSurfaceVariant }}>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                <Link href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" sx={{ ml: 1, color: tokens.color.primary, "&:hover": { color: tokens.color.onPrimaryContainer } }}>https://ec.europa.eu/consumers/odr/</Link>.<br/>
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </Typography>

            <Typography variant={"h4"} sx={{ color: tokens.color.onSurface, fontFamily: tokens.font.display }}>Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle</Typography>
            <Typography variant={"body1"} sx={{ color: tokens.color.onSurfaceVariant }}>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </Typography>
        </Box>
    );
}