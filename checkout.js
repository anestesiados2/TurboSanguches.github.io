document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('checkout-form');
    const modal = document.getElementById('confirmation-modal');
    const closeButton = document.querySelector('.close-button');
    const phoneInput = document.getElementById('phone');
    const countryCodeSelect = document.getElementById('country-code');

    form.addEventListener('submit', function(event) {
        // Prevenir el envío real del formulario para propósitos de demostración
        event.preventDefault();

        // Mostrar el modal
        modal.style.display = 'block';
    });

    closeButton.addEventListener('click', function() {
        // Ocultar el modal y redirigir a la página principal
        modal.style.display = 'none';
        window.location.href = 'index.html'; // Redirigir a la página principal
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            // Ocultar el modal y redirigir a la página principal si se hace clic fuera del contenido
            modal.style.display = 'none';
            window.location.href = 'index.html'; // Redirigir a la página principal
        }
    });

    // Inicializar el campo de teléfono con el prefijo seleccionado
    function updatePhoneInput() {
        const selectedPrefix = countryCodeSelect.value;
        const currentValue = phoneInput.value.replace(/^\+\d+/, ''); // Eliminar prefijo actual si existe
        phoneInput.value = selectedPrefix + currentValue;
    }

    // Actualizar el campo de teléfono cuando el prefijo cambia
    countryCodeSelect.addEventListener('change', updatePhoneInput);

    phoneInput.addEventListener('input', function(e) {
        // Reemplazar caracteres no numéricos y limitar a 15 caracteres
        const selectedPrefix = countryCodeSelect.value;
        const currentValue = this.value.replace(/[^0-9+]/g, '');
        if (currentValue.startsWith(selectedPrefix)) {
            this.value = currentValue.substring(0, 15);
        } else {
            this.value = selectedPrefix + currentValue.substring(selectedPrefix.length, 15);
        }
    });

    document.getElementById('card-number').addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
    });

    document.getElementById('expiry-date').addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '').replace(/(.{2})/, '$1/').trim();
    });

    document.getElementById('cvv').addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '');
    });
});
