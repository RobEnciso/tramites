document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const form = document.getElementById('multi-step-form');
    const steps = Array.from(document.querySelectorAll('.form-step'));
    const progressText = document.getElementById('progress');
    const successMessage = document.getElementById('success-message');

    let currentStep = 0;

    // Función para mostrar el paso actual y ocultar los demás
    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.style.display = index === stepIndex ? 'block' : 'none';
        });
        progressText.textContent = `Paso ${stepIndex + 1} de ${steps.length}`;
        
        // Lógica de los botones
        prevBtn.style.display = stepIndex === 0 ? 'none' : 'inline-block';
        nextBtn.style.display = stepIndex === steps.length - 1 ? 'none' : 'inline-block';
        submitBtn.style.display = stepIndex === steps.length - 1 ? 'inline-block' : 'none';
    }

    // Función para validar los campos del paso actual
    function validateStep(stepIndex) {
        const currentStepFields = steps[stepIndex].querySelectorAll('[required]');
        let isValid = true;
        currentStepFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                // Opcional: añadir una clase de error para resaltar el campo
                field.classList.add('input-error');
            } else {
                field.classList.remove('input-error');
            }
        });
        if (!isValid) {
            alert('Por favor, completa todos los campos obligatorios.');
        }
        return isValid;
    }

    // Evento para el botón "Siguiente"
    nextBtn.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            currentStep++;
            showStep(currentStep);
        }
    });

    // Evento para el botón "Anterior"
    prevBtn.addEventListener('click', () => {
        currentStep--;
        showStep(currentStep);
    });
    
    // Evento para el envío final del formulario
    form.addEventListener('submit', function(e) {
      e.preventDefault(); // Evita que la página se recargue

      if (!validateStep(currentStep)) {
          return; // Detiene el envío si el último paso no es válido
      }

      const formData = new FormData(form);
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';

      fetch(form.action, {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.result === 'success') {
          form.style.display = 'none';
          successMessage.style.display = 'block';
        } else {
          throw new Error(data.error || 'Hubo un error desconocido en el servidor.');
        }
      })
      .catch(error => {
        console.error('Error en el envío:', error);
        alert('Hubo un error al enviar el formulario. Por favor, revisa tu conexión e inténtalo de nuevo.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar Información';
      });
    });

    // Mostrar el primer paso al cargar la página
    showStep(currentStep);
});