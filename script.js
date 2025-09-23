document.addEventListener('DOMContentLoaded', function() {
    let currentStep = 1;
    const totalSteps = 7;
    const form = document.getElementById('multi-step-form');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');
    const progress = document.getElementById('progress');
    const successMessage = document.getElementById('success-message');

    function showStep(step) {
        // Hide all steps
        for (let i = 1; i <= totalSteps; i++) {
            document.getElementById('step-' + i).style.display = 'none';
        }
        // Show the current step
        document.getElementById('step-' + step).style.display = 'block';

        // Update progress bar
        progress.textContent = `Paso ${step} de ${totalSteps}`;

        // Update button visibility
        if (step === 1) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'inline-block';
        }

        if (step === totalSteps) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }
    }

    function validateStep(step) {
        let valid = true;
        const currentStepFields = document.querySelectorAll(`#step-${step} [required]`);

        currentStepFields.forEach(field => {
            if (field.type === 'radio' || field.type === 'checkbox') {
                const name = field.name;
                if (!document.querySelector(`input[name="${name}"]:checked`)) {
                    valid = false;
                }
            } else if (!field.value.trim()) {
                valid = false;
            }
        });

        if (!valid) {
            alert('Por favor, completa todos los campos obligatorios.');
        }
        return valid;
    }

    nextBtn.addEventListener('click', () => {
        if (validateStep(currentStep) && currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateStep(currentStep)) {
            // Here you would typically send the data to a server
            // For this example, we'll just hide the form and show the success message
            form.style.display = 'none';
            successMessage.style.display = 'block';
        }
    });

    // --- LOGIC FOR CONDITIONAL FIELDS ---

    // Step 2: Nationality
    const otraNacionalidadRadios = document.querySelectorAll('input[name="otra-nacionalidad"]');
    const cualNacionalidadInput = document.querySelector('input[name="cual-nacionalidad"]');
    otraNacionalidadRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            cualNacionalidadInput.style.display = e.target.value === 'Sí' ? 'block' : 'none';
        });
    });

    const residentePermanenteRadios = document.querySelectorAll('input[name="residente-permanente"]');
    const cualResidenciaInput = document.querySelector('input[name="cual-residencia"]');
    residentePermanenteRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            cualResidenciaInput.style.display = e.target.value === 'Sí' ? 'block' : 'none';
        });
    });

    const ssnItinRadios = document.querySelectorAll('input[name="ssn-itin"]');
    const ssnItinNumeroInput = document.querySelector('input[name="ssn-itin-numero"]');
    ssnItinRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            ssnItinNumeroInput.style.display = e.target.value === 'Sí' ? 'block' : 'none';
        });
    });

    // Step 6: Travel History
    const viajadoAntesRadios = document.querySelectorAll('input[name="viajado-antes"]');
    const viajadoAntesDetalles = document.querySelector('textarea[name="viajado-antes-detalles"]');
    viajadoAntesRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            viajadoAntesDetalles.style.display = e.target.value === 'Sí' ? 'block' : 'none';
        });
    });

    const visaNegadaRadios = document.querySelectorAll('input[name="visa-negada"]');
    const visaNegadaDetalles = document.querySelector('textarea[name="visa-negada-detalles"]');
    visaNegadaRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            visaNegadaDetalles.style.display = e.target.value === 'Sí' ? 'block' : 'none';
        });
    });

    const problemasMigratoriosRadios = document.querySelectorAll('input[name="problemas-migratorios"]');
    const problemasMigratoriosDetalles = document.querySelector('textarea[name="problemas-migratorios-detalles"]');
    problemasMigratoriosRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            problemasMigratoriosDetalles.style.display = e.target.value === 'Sí' ? 'block' : 'none';
        });
    });


    // Initialize the form
    showStep(currentStep);
});
