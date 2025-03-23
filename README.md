Preguntar a responder

1. En Vue 3, reactive() convierte un objeto en reactivo, pero Vue no detecta los cambios en propiedades anidadas si estas se añaden después de que el objeto haya sido creado. Para manejar este tipo de cambios en propiedades anidadas, se recomienda utilizar Vue.set() o, en Vue 3, puedes usar la función reactive() para hacerlo.


2. watch() es una función de Vue que te permite observar cambios en datos reactivos y ejecutar una función cuando ocurre un cambio. Se puede utilizar para observar propiedades específicas dentro de un objeto reactivo, lo cual es muy útil cuando necesitas realizar una acción cada vez que se cambie una propiedad en particular.

3. Cuando tienes un array de productos y cada producto es un objeto reactivo, y quieres observar cambios en el stock de cualquiera de los productos, puedes hacer que watch() observe el array completo o una propiedad específica dentro de cada producto.

