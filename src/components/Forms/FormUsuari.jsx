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
  VolunteerActivism,
} from "@mui/icons-material";
import { colors } from "../../colors.jsx";
import { useNavigate } from "react-router-dom";

export default function FormUsuari() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Informació bàsica
    telefono: "",
    data_nacimiento: "",
    descripcion: "",
    foto_perfil: null,
    genero: "",
    necesidades_esp: false,
    mascota_previa: false,
    mascota_actual: false,
    casa_acollida: false,
    tipo_vivienda: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const generoOptions = [
    { value: "M", label: "Masculí" },
    { value: "F", label: "Femení" },
    { value: "O", label: "Altres" },
    { value: "N", label: "Preferisc no dir-ho" },
  ];

  const tipoViviendaOptions = [
    { value: "apartamento", label: "Apartamento" },
    { value: "casa_pequeña", label: "Casa pequeña" },
    { value: "casa_grande", label: "Casa grande" },
    { value: "casa_con_jardin", label: "Casa con jardín" },
    { value: "finca", label: "Finca/Casa rural" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      foto_perfil: file,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.telefono.trim()) newErrors.telefono = "Telèfon obligatori";
    if (!formData.data_nacimiento)
      newErrors.data_nacimiento = "Data de naixement obligatòria";
    if (!formData.descripcion.trim())
      newErrors.descripcion = "Descripció obligatòria";
    if (!formData.genero) newErrors.genero = "Gènere obligatori";
    if (!formData.tipo_vivienda)
      newErrors.tipo_vivienda = "Tipus de vivenda obligatori";

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
      console.log("Dades de l'usuari:", formData);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("Perfil d'usuari creat correctament!");
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
            <Group />
            Perfil d'Usuari
          </Typography>

          <Typography
            variant="body1"
            align="center"
            sx={{ mb: 4, color: "text.secondary", lineHeight: 1.6 }}
          >
            Completa la informació del teu perfil per poder adoptar mascotes
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            {/* Informació Personal */}
            <Typography
              variant="h6"
              sx={{ mb: 2, color: colors.blue, fontWeight: "bold" }}
            >
              <Group sx={{ mr: 1, verticalAlign: "middle" }} />
              Informació Personal
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  fullWidth
                  name="telefono"
                  label="Telèfon de contacte"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  error={!!errors.telefono}
                  helperText={errors.telefono}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone sx={{ color: colors.orange }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  fullWidth
                  name="data_nacimiento"
                  label="Data de naixement"
                  type="date"
                  value={formData.data_nacimiento}
                  onChange={handleInputChange}
                  error={!!errors.data_nacimiento}
                  helperText={errors.data_nacimiento}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth required error={!!errors.genero}>
                  <InputLabel>Gènere</InputLabel>
                  <Select
                    name="genero"
                    value={formData.genero}
                    onChange={handleInputChange}
                    label="Gènere"
                  >
                    {generoOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.genero && (
                    <Typography color="error" variant="caption">
                      {errors.genero}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  sx={{
                    height: 56,
                    borderColor: colors.orange,
                    color: colors.orange,
                    "&:hover": {
                      borderColor: colors.darkOrange,
                      backgroundColor: "rgba(245, 132, 43, 0.04)",
                    },
                  }}
                >
                  {formData.foto_perfil
                    ? "Foto seleccionada"
                    : "Pujar foto de perfil"}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={4}
                  name="descripcion"
                  label="Descripció personal"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  error={!!errors.descripcion}
                  helperText={
                    errors.descripcion ||
                    "Explica una mica sobre tu, els teus interessos i experiència amb animals"
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Description sx={{ color: colors.orange }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Situació de Vivenda */}
            <Typography
              variant="h6"
              sx={{ mb: 2, color: colors.blue, fontWeight: "bold" }}
            >
              <LocationOn sx={{ mr: 1, verticalAlign: "middle" }} />
              Situació de Vivenda
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth required error={!!errors.tipo_vivienda}>
                  <InputLabel>Tipus de vivenda</InputLabel>
                  <Select
                    name="tipo_vivienda"
                    value={formData.tipo_vivienda}
                    onChange={handleInputChange}
                    label="Tipus de vivenda"
                  >
                    {tipoViviendaOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.tipo_vivienda && (
                    <Typography color="error" variant="caption">
                      {errors.tipo_vivienda}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Experiència amb Animals */}
            <Typography
              variant="h6"
              sx={{ mb: 2, color: colors.blue, fontWeight: "bold" }}
            >
              <Pets sx={{ mr: 1, verticalAlign: "middle" }} />
              Experiència amb Animals
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.mascota_previa}
                      onChange={() => handleCheckboxChange("mascota_previa")}
                      sx={{ color: colors.blue }}
                    />
                  }
                  label="He tingut mascotes abans"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.mascota_actual}
                      onChange={() => handleCheckboxChange("mascota_actual")}
                      sx={{ color: colors.blue }}
                    />
                  }
                  label="Actualment tinc mascotes"
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Capacitat d'Involucració */}
            <Typography
              variant="h6"
              sx={{ mb: 2, color: colors.blue, fontWeight: "bold" }}
            >
              <VolunteerActivism sx={{ mr: 1, verticalAlign: "middle" }} />
              Capacitat d'Involucració
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.necesidades_esp}
                      onChange={() => handleCheckboxChange("necesidades_esp")}
                      sx={{ color: colors.blue }}
                    />
                  }
                  label="Tinc els recursos i la capacitat per cuidar animals amb necessitats especials"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.casa_acollida}
                      onChange={() => handleCheckboxChange("casa_acollida")}
                      sx={{ color: colors.blue }}
                    />
                  }
                  label="Puc ser casa d'acollida"
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
                  color: "white",
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
                {loading ? "Creant perfil..." : "Crear Perfil d'Usuari"}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
