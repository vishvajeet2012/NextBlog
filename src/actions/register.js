export async function registerUserAction(formData) {
    const validatedField = schema.safeParse({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
    });
  
    if (!validatedField.success) {
      return { error: validatedField.error.errors, status: 400 };
    }
  
    const { firstName, lastName, email, password } = validatedField.data;
  
    try {
      const req = await request();
      const decision = await aj.protect(req, {
        email,
        password,
        firstName,
        lastName,
      });
  
      // Ensure that the `decision` object is plain and serializable
      const plainDecision = JSON.parse(JSON.stringify(decision));
  
      return { success: true, decision: plainDecision, status: 200 };
    } catch (error) {
      console.error('Error registering user:', error);
      return { error: 'Registration failed', status: 500 };
    }
  }
  