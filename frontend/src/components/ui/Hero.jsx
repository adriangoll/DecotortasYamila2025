import { Box, Typography, Button } from '@mui/material';

function Hero() {
    return (
        // Box es similar a un div, pero con estilos más fáciles
        <Box
        sx={{
            backgroundColor: '#fce4ec', // fondo rosado claro
            padding: '4rem 2rem',
            textAlign: 'center',
            borderRadius: '12px',
            marginY: '2rem',
            maxWidth: '100%',
            with: '100%'
        }}
        >
        <img
            src="https://whipped.in/cdn/shop/products/DesignerCake_1800x1800_57c16e73-cc12-4a6a-b456-7d312816e5e9_800x.jpg?v=1687431697" 
            alt="Oferta especial"
            style={{ width: 'full', display:'block', height: '300px', borderRadius: '8px', margin: '0 auto 1.5rem', }}
        />
        {/* Título principal con tipografía grande */}
        <Typography variant="h4" component="h2" gutterBottom>
            ¡Oferta Especial en Tortas Personalizadas!
        </Typography>

        {/* Texto secundario con estilo similar a un parrafo */}
        <Typography variant="body1" sx={{ marginBottom: '1.5rem' }}>
            Hacé tu pedido hoy y obtené un 15% de descuento en tu primera compra.
        </Typography>

        {/* Botón con estilo de MUI */}
        <Button variant="contained" color="secondary" size="large">
            Comprar ahora
        </Button>
        </Box>
    );
}

export default Hero;
