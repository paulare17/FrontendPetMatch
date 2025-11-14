import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Divider,
  Grid,
} from "@mui/material";
import {
  Business,
  Email,
  Phone,
  LocationOn,
  Language,
  Schedule,
  Pets,
  Description,
  ContactPhone,
  Group,
} from "@mui/icons-material";
import { colors } from "../../colors.jsx";
import { useNavigate } from "react-router-dom";

export default function FormProtectora() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Informació bàsica
    nomProtectora: "",
    email: "",
    telefon: "",
    telefonEmergencia: "",
    webSite: "",

    // Adreça
    carrer: "",
    ciutat: "",
    codiPostal: "",
    provincia: "Barcelona",

    // Horaris
    horariApertura: "",
    horariTancament: "",
    diesOberts: [],

    // Informació específica
    tipusAnimals: [],
    capacitatMaxima: "",
    anyFundacio: "",
    nucleoZoologico: "",

    // Descripció i serveis
    descripcio: "",
    serveisOferts: [],

    // Requisits adopció
    requisitoAdopcio: "",
    procesAdopcio: "",

    // Xarxes socials
    facebook: "",
    instagram: "",
    twitter: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const dies = [
    "Dilluns",
    "Dimarts",
    "Dimecres",
    "Dijous",
    "Divendres",
    "Dissabte",
    "Diumenge",
  ];
  const provincies = ["Barcelona", "Girona", "Lleida", "Tarragona"];
  const tipusAnimalsOptions = ["Gats", "Gossos", "Altres"];
  const serveisOptions = [
    "Adopció",
    "Acollida temporal",
    "Veterinari",
    "Educació",
    "Rehabilitació",
    "Transport",
    "Castració/Esterilització",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter((item) => item !== value)
        : [...prev[name], value],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nomProtectora.trim())
      newErrors.nomProtectora = "Nom de la protectora obligatori";
    if (!formData.email.trim()) newErrors.email = "Email obligatori";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Format d'email invàlid";
    if (!formData.telefon.trim()) newErrors.telefon = "Telèfon obligatori";
    if (!formData.carrer.trim()) newErrors.carrer = "Carrer obligatori";
    if (!formData.ciutat.trim()) newErrors.ciutat = "Ciutat obligatòria";
    if (!formData.codiPostal.trim())
      newErrors.codiPostal = "Codi postal obligatori";
    if (!formData.descripcio.trim())
      newErrors.descripcio = "Descripció obligatòria";
    if (formData.tipusAnimals.length === 0)
      newErrors.tipusAnimals = "Selecciona almenys un tipus d'animal";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Simulem l'enviament
      console.log("Dades de la protectora:", formData);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("Perfil de protectora creat correctament!");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert("Error en crear el perfil. Intenta-ho de nou.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/formulari-dialog");
  };

  return (
    <Box
      sx={{
        backgroundColor: colors.backgroundOrange,
        padding: 3,
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        overflowY: "auto", // Permet scroll vertical
      }}
    >
      <Card sx={{ height: "100%", width: "80%", borderRadius: 5 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{
              mb: 3,
              color: colors.blue,
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Pets />
            Perfil de Protectora
          </Typography>

          <Typography
            variant="body1"
            align="center"
            sx={{ mb: 4, color: "text.secondary", lineHeight: 1.6 }}
          >
            Completa la informació de la teva protectora per poder oferir els
            teus serveis d'adopció
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            {/* Informació Bàsica */}
            <Typography
              variant="h6"
              sx={{ mb: 2, color: colors.blue, fontWeight: "bold" }}
            >
              <Business sx={{ mr: 1, verticalAlign: "middle" }} />
              Informació Bàsica
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid size={{ xs: 12, sm: 12 }}>
                <TextField
                  required
                  fullWidth
                  name="nomProtectora"
                  label="Nom de la Protectora"
                  value={formData.nomProtectora}
                  onChange={handleInputChange}
                  error={!!errors.nomProtectora}
                  helperText={errors.nomProtectora}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Business sx={{ color: colors.orange }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  label="Email de contacte"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: colors.orange }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField
                  required
                  fullWidth
                  name="telefon"
                  label="Telèfon principal"
                  value={formData.telefon}
                  onChange={handleInputChange}
                  error={!!errors.telefon}
                  helperText={errors.telefon}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone sx={{ color: colors.orange }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField
                  fullWidth
                  name="telefonEmergencia"
                  label="Telèfon d'emergència"
                  value={formData.telefonEmergencia}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ContactPhone sx={{ color: colors.orange }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField
                  fullWidth
                  name="webSite"
                  label="Pàgina web"
                  value={formData.webSite}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Language sx={{ color: colors.orange }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Adreça */}
            <Typography
              variant="h6"
              sx={{ mb: 2, color: colors.blue, fontWeight: "bold" }}
            >
              <LocationOn sx={{ mr: 1, verticalAlign: "middle" }} />
              Ubicació
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField
                  required
                  fullWidth
                  name="carrer"
                  label="Carrer i número"
                  value={formData.carrer}
                  onChange={handleInputChange}
                  error={!!errors.carrer}
                  helperText={errors.carrer}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField
                  required
                  fullWidth
                  name="ciutat"
                  label="Ciutat"
                  value={formData.ciutat}
                  onChange={handleInputChange}
                  error={!!errors.ciutat}
                  helperText={errors.ciutat}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField
                  required
                  fullWidth
                  name="codiPostal"
                  label="Codi Postal"
                  value={formData.codiPostal}
                  onChange={handleInputChange}
                  error={!!errors.codiPostal}
                  helperText={errors.codiPostal}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 3 }}>
                <FormControl fullWidth>
                  <InputLabel>Província</InputLabel>
                  <Select
                    name="provincia"
                    value={formData.provincia}
                    onChange={handleInputChange}
                    label="Província"
                  >
                    {provincies.map((provincia) => (
                      <MenuItem key={provincia} value={provincia}>
                        {provincia}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Horaris */}
            <Typography
              variant="h6"
              sx={{ mb: 2, color: colors.blue, fontWeight: "bold" }}
            >
              <Schedule sx={{ mr: 1, verticalAlign: "middle" }} />
              Horaris d'Atenció
            </Typography>

            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField
                  fullWidth
                  name="horariApertura"
                  label="Hora d'obertura"
                  type="time"
                  value={formData.horariApertura}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField
                  fullWidth
                  name="horariTancament"
                  label="Hora de tancament"
                  type="time"
                  value={formData.horariTancament}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            <Typography variant="body2" sx={{ mb: 2, color: colors.blue }}>
              Dies oberts:
            </Typography>
            <FormGroup row sx={{ mb: 4 }}>
              {dies.map((dia) => (
                <FormControlLabel
                  key={dia}
                  control={
                    <Checkbox
                      checked={formData.diesOberts.includes(dia)}
                      onChange={() => handleCheckboxChange("diesOberts", dia)}
                      sx={{ color: colors.blue }}
                    />
                  }
                  label={dia}
                />
              ))}
            </FormGroup>

            <Divider sx={{ my: 3 }} />

            {/* Informació Específica */}
            <Typography
              variant="h6"
              sx={{ mb: 2, color: colors.blue, fontWeight: "bold" }}
            >
              <Pets sx={{ mr: 1, verticalAlign: "middle" }} />
              Informació dels Animals
            </Typography>

            <Typography variant="body2" sx={{ mb: 2, color: colors.blue }}>
              Tipus d'animals que acolliu: *
            </Typography>
            <FormGroup row sx={{ mb: 3 }}>
              {tipusAnimalsOptions.map((tipus) => (
                <FormControlLabel
                  key={tipus}
                  control={
                    <Checkbox
                      checked={formData.tipusAnimals.includes(tipus)}
                      onChange={() =>
                        handleCheckboxChange("tipusAnimals", tipus)
                      }
                      sx={{ color: colors.blue }}
                    />
                  }
                  label={tipus}
                />
              ))}
            </FormGroup>
            {errors.tipusAnimals && (
              <Typography
                color="error"
                variant="caption"
                sx={{ mb: 2, display: "block" }}
              >
                {errors.tipusAnimals}
              </Typography>
            )}

            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  name="capacitatMaxima"
                  label="Capacitat màxima d'animals"
                  type="number"
                  value={formData.capacitatMaxima}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  name="anyFundacio"
                  label="Any de fundació"
                  type="number"
                  value={formData.anyFundacio}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  name="numeroRegistre"
                  label="Número de registre"
                  value={formData.numeroRegistre}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Descripció i Serveis */}
            <Typography
              variant="h6"
              sx={{ mb: 2, color: colors.blue, fontWeight: "bold" }}
            >
              <Description sx={{ mr: 1, verticalAlign: "middle" }} />
              Descripció i Serveis
            </Typography>

            <TextField
              required
              fullWidth
              multiline
              rows={4}
              name="descripcio"
              label="Descripció de la protectora"
              value={formData.descripcio}
              onChange={handleInputChange}
              error={!!errors.descripcio}
              helperText={
                errors.descripcio ||
                "Explica la història, missió i valors de la protectora"
              }
              sx={{ mb: 3 }}
            />

            <Typography variant="body2" sx={{ mb: 2, color: colors.blue }}>
              Serveis que oferiu:
            </Typography>
            <FormGroup row sx={{ mb: 4 }}>
              {serveisOptions.map((servei) => (
                <FormControlLabel
                  key={servei}
                  control={
                    <Checkbox
                      checked={formData.serveisOferts.includes(servei)}
                      onChange={() =>
                        handleCheckboxChange("serveisOferts", servei)
                      }
                      sx={{ color: colors.blue }}
                    />
                  }
                  label={servei}
                />
              ))}
            </FormGroup>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  name="requisitoAdopcio"
                  label="Requisits per l'adopció"
                  value={formData.requisitoAdopcio}
                  onChange={handleInputChange}
                  helperText="Explica els requisits que han de complir els adoptants"
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  name="procesAdopcio"
                  label="Procés d'adopció"
                  value={formData.procesAdopcio}
                  onChange={handleInputChange}
                  helperText="Descriu el procés que seguiu per les adopcions"
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Xarxes Socials */}
            <Typography
              variant="h6"
              sx={{ mb: 2, color: colors.blue, fontWeight: "bold" }}
            >
              <Group sx={{ mr: 1, verticalAlign: "middle" }} />
              Xarxes Socials
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  name="facebook"
                  label="Facebook"
                  value={formData.facebook}
                  onChange={handleInputChange}
                  placeholder="https://facebook.com/..."
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  name="instagram"
                  label="Instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  placeholder="https://instagram.com/..."
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  name="twitter"
                  label="Twitter"
                  value={formData.twitter}
                  onChange={handleInputChange}
                  placeholder="https://twitter.com/..."
                />
              </Grid>
            </Grid>

            {/* Botons d'acció */}
            <Box
              sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 4 }}
            >
              <Button
                variant="container"
                onClick={handleCancel}
                sx={{
                    color: 'white',
                  bgcolor: colors.orange,
                  "&:hover": {
                    bgcolor: colors.darkOrange,
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(245, 132, 43, 0.3)",
                  },
                  borderRadius: 5,
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                Cancel·lar
              </Button>

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  bgcolor: colors.blue,
                  "&:hover": {
                    bgcolor: colors.darkBlue,
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(102, 197, 189, 0.3)",
                  },
                  borderRadius: 5,
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                {loading ? "Creant perfil..." : "Crear Perfil de Protectora"}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
