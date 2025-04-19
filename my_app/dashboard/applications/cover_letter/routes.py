from flask import render_template
from . import cover_letter #import the cover_letter Blueprint

@cover_letter.route('/')
def cover_letter_home():
    return render_template('cover_letter.html')


